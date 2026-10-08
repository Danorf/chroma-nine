import {zones,hsvToRgb,rgbToHsv,hex,parseHex,inZone,palette,ink} from './color.js';
const $=id=>document.getElementById(id);
let current={h:57,s:83,v:90}, colors=palette(57);
try {const saved=JSON.parse(localStorage.getItem('chroma-nine'));if(saved&&['h','s','v'].every(k=>Number.isFinite(saved[k])&&saved[k]>=0&&saved[k]<=(k==='h'?359:100))) {current=saved;colors=palette(current.h);}} catch {}
$('regions').innerHTML=zones.map((z,i)=>`<div class="region" style="left:${z.s[0]}%;top:${100-z.v[1]}%;width:${100-z.s[0]}%;height:${z.v[1]-z.v[0]}%">${i+1}</div>`).join('');
function render(){
 const rgb=hsvToRgb(current.h,current.s,current.v),value=hex(rgb);
 $('atmospheres').style.color=value;
 $('plane').style.background=`linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(${current.h} 100% 50%))`;
 $('cursor').style.left=current.s+'%';$('cursor').style.top=(100-current.v)+'%';
 for(const [id,key] of [['hue','h'],['sat','s'],['val','v']])$(id).value=current[key];
 $('hue-value').textContent=Math.round(current.h)+'°';$('sample').style.background=value;$('sample').style.color=ink(rgb);$('sample-hex').textContent=value;$('hex-input').value=value;
 $('rgb').textContent=rgb.join(' / ');$('hsb').textContent=`${Math.round(current.h)}° / ${Math.round(current.s)}% / ${Math.round(current.v)}%`;
 const zone=zones.findIndex(z=>inZone(current.s,current.v,z));$('zone-label').textContent=zone<0?'Fuera de las cinco zonas':zones[zone].name;
 document.querySelectorAll('.region').forEach((el,i)=>el.classList.toggle('active',i===zone));
 $('palette').innerHTML=colors.map((c,i)=>{const rgb=hsvToRgb(c.h,c.s,c.v);return `<button class="card" data-index="${i}" aria-label="Explorar ${zones[i].name}, ${hex(rgb)}"><div class="card-color" style="background:${hex(rgb)};color:${ink(rgb)}"><span>0${i+1}</span><strong>${hex(rgb)}</strong></div><div class="card-text"><strong>${zones[i].name}</strong><span>${zones[i].subtitle}</span></div></button>`;}).join('');
 try{localStorage.setItem('chroma-nine',JSON.stringify(current));}catch{}
}
function update(h,s,v){const changed=h!==current.h;current={h,s,v};if(changed)colors=palette(h);const zone=zones.findIndex(z=>inZone(s,v,z));if(zone>=0)colors[zone]={...current};render();}
$('palette').addEventListener('click',e=>{const card=e.target.closest('[data-index]');if(!card)return;current={...colors[Number(card.dataset.index)]};render();});
for(const [id,key] of [['hue','h'],['sat','s'],['val','v']])$(id).addEventListener('input',e=>{const c={...current,[key]:Number(e.target.value)};update(c.h,c.s,c.v);});
function point(e){const r=$('plane').getBoundingClientRect();update(current.h,Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)),Math.max(0,Math.min(100,100-(e.clientY-r.top)/r.height*100)));}
$('plane').addEventListener('pointerdown',e=>{if(e.button!==0)return;$('plane').setPointerCapture(e.pointerId);point(e);});
$('plane').addEventListener('pointermove',e=>{if($('plane').hasPointerCapture(e.pointerId))point(e);});
$('hex-form').addEventListener('submit',e=>{e.preventDefault();const rgb=parseHex($('hex-input').value);if(!rgb){$('error').textContent='Usa un HEX de 3 o 6 dígitos, como #F6C o #FF66CC.';return;}$('error').textContent='';update(...rgbToHsv(...rgb));});
let timer;
async function copy(value){try{await navigator.clipboard.writeText(value);$('toast').textContent='Copiado al portapapeles';}catch{$('toast').textContent='No se pudo copiar. Selecciona el código manualmente.';}$('toast').classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('visible'),2400);}
$('copy-current').addEventListener('click',()=>copy(hex(hsvToRgb(current.h,current.s,current.v))));
$('copy-palette').addEventListener('click',()=>copy(colors.map(c=>hex(hsvToRgb(c.h,c.s,c.v))).join(', ')));
render();
