import {test} from 'node:test';
import assert from 'node:assert/strict';
import {hsvToRgb,rgbToHsv,hex,parseHex,zones,palette,inZone,ink} from './color.js';
test('primarios, blanco y negro',()=>{assert.equal(hex(hsvToRgb(0,100,100)),'#FF0000');assert.equal(hex(hsvToRgb(120,100,100)),'#00FF00');assert.equal(hex(hsvToRgb(240,100,100)),'#0000FF');assert.equal(hex(hsvToRgb(57,0,100)),'#FFFFFF');assert.equal(hex(hsvToRgb(57,100,0)),'#000000');});
test('RGB → HSV → RGB conserva valores incluyendo grises',()=>{for(const rgb of [[255,0,128],[127,127,127],[0,0,0],[255,255,255],[12,240,87]])assert.deepEqual(hsvToRgb(...rgbToHsv(...rgb)),rgb);});
test('HEX valida y admite abreviación',()=>{assert.deepEqual(parseHex('#F6C'),[255,102,204]);assert.equal(parseHex('#xyz'),null);assert.equal(parseHex('FF00FF00'),null);});
test('cinco muestras pertenecen a sus zonas para todos los tonos',()=>{for(let h=0;h<360;h++){const colors=palette(h);assert.equal(colors.length,5);colors.forEach((c,i)=>{assert.ok(inZone(c.s,c.v,zones[i]));assert.match(hex(hsvToRgb(c.h,c.s,c.v)),/^#[0-9A-F]{6}$/);});}});
test('texto legible en extremos',()=>{assert.equal(ink([255,255,255]),'#111111');assert.equal(ink([0,0,0]),'#FFFFFF');});
