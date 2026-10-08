export const zones = [
  {name:'Pastel', subtitle:'Suave · luminoso', s:[34,100], v:[67,100]},
  {name:'Fresh', subtitle:'Fresco · equilibrado', s:[56,100], v:[56,67]},
  {name:'Neon', subtitle:'Intenso · vibrante', s:[67,100], v:[44,56]},
  {name:'Darken', subtitle:'Profundo · contenido', s:[56,100], v:[33,44]},
  {name:'Somber', subtitle:'Sombra · dramático', s:[34,100], v:[0,33]},
];
export function hsvToRgb(h,s,v) {
  s/=100; v/=100;
  const f=n=>{const k=(n+h/60)%6; return Math.round(255*v*(1-s*Math.max(0,Math.min(k,4-k,1))));};
  return [f(5),f(3),f(1)];
}
export function rgbToHsv(r,g,b) {
  r/=255;g/=255;b/=255;
  const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
  let h=d===0?0:max===r?((g-b)/d)%6:max===g?(b-r)/d+2:(r-g)/d+4;
  return [(h*60+360)%360,max===0?0:d/max*100,max*100];
}
export function hex(rgb) {return '#'+rgb.map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();}
export function parseHex(value) {const m=/^#?([\da-f]{6}|[\da-f]{3})$/i.exec(value.trim()); if(!m)return null;const x=m[1].length===3?[...m[1]].map(c=>c+c).join(''):m[1];return [0,2,4].map(i=>parseInt(x.slice(i,i+2),16));}
export function inZone(s,v,z) {return s>=z.s[0]&&s<=z.s[1]&&v>=z.v[0]&&v<=z.v[1];}
export function palette(h) {return zones.map(z=>({h,s:(z.s[0]+z.s[1])/2,v:(z.v[0]+z.v[1])/2}));}
export function ink(rgb) {const lum=rgb.map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;}).reduce((a,c,i)=>a+c*[.2126,.7152,.0722][i],0);return lum>.179?'#111111':'#FFFFFF';}
