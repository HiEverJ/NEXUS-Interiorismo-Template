import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const main = read('assets/js/main.js');
const early = read('assets/js/theme.js');
let cases = 0;
for (const scenario of [
    {stored:null, light:true, expected:'light'},
    {stored:null, light:false, expected:'dark'},
    {stored:'corrupt-value', light:true, expected:'light'},
    {stored:'dark', light:true, expected:'dark'},
    {stored:'light', light:false, expected:'light'},
    {blocked:true, light:true, expected:'light'},
    {blocked:true, light:false, expected:'dark'}
]) {
    const callbacks = {};
    const button = {hidden:true, setAttribute:(k,v)=>callbacks[k]=v, addEventListener:(k,v)=>callbacks[k]=v};
    const system = {matches:scenario.light,addEventListener:(k,v)=>callbacks.system=v};
    let saved;
    const context = vm.createContext({
        document:{documentElement:{dataset:{}},getElementById:()=>button,addEventListener:()=>{}},
        window:{matchMedia:()=>system},matchMedia:()=>system,
        localStorage:{getItem:()=>{if(scenario.blocked) throw Error('Blocked'); return scenario.stored;},setItem:(k,v)=>{if(scenario.blocked) throw Error('Blocked');saved=v;}}
    });
    vm.runInContext(early,context);
    assert.equal(context.document.documentElement.dataset.theme,scenario.expected);
    vm.runInContext(main,context);
    vm.runInContext('initTheme()',context);
    assert.equal(context.document.documentElement.dataset.theme,scenario.expected);
    callbacks.click();
    const toggled = scenario.expected==='light'?'dark':'light';
    assert.equal(context.document.documentElement.dataset.theme,toggled);
    assert.equal(callbacks['aria-pressed'],String(toggled==='light'));
    assert.equal(button.hidden,false);
    if(!scenario.blocked) assert.equal(saved,toggled);
    system.matches=!system.matches;
    callbacks.system();
    assert.equal(context.document.documentElement.dataset.theme,toggled,'Explicit choice survives system changes');
    cases++;
}
const html=read('index.html');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs are unique');
for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value=match[1];
    if(value.startsWith('#')) assert.ok(ids.includes(value.slice(1)),`Missing anchor ${value}`);
    else if(!/^[a-z]+:/i.test(value)) assert.ok(fs.existsSync(path.join(root,value)),`Missing local asset ${value}`);
}
for(const match of html.matchAll(/aria-(?:controls|describedby)="([^"]+)"/g)) for(const id of match[1].split(' ')) assert.ok(ids.includes(id),`Missing ARIA target ${id}`);
assert.equal((html.match(/<summary\b/g)||[]).length,6);
assert.equal((html.match(/loading="lazy"/g)||[]).length,4);
assert.equal((html.match(/fetchpriority="high"/g)||[]).length,1);
console.log(`PASS: ${cases} theme scenarios, blocked storage, theme interaction, local assets, anchors, ARIA targets, image loading attributes.`);
