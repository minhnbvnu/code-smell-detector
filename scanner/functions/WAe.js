function WAe(e,t){const r=aT(t);let n=t,i=Ba;if(r in e.normal)return e.property[e.normal[r]];if(r.length>4&&r.slice(0,4)==="data"&&zAe.test(t)){if(t.charAt(4)==="-"){const a=t.slice(5).replace(vV,UAe);n="data"+a.charAt(0).toUpperCase()+a.slice(1)}else{const a=t.slice(4);if(!vV.test(a)){let l=a.replace(jAe,ZAe);l.charAt(0)!=="-"&&(l="-"+l),t="data"+l}}i=KI}return new i(n,t)}