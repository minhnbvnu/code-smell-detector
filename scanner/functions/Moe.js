function Moe(e,t){let r=WQ.get(t);if(r)return r;let n=[],i=!0;function a(l,s){let u=e.sliceString(l.from,l.to);n.push({label:u,type:s})}return t.cursor(yr.IncludeAnonymous).iterate(l=>{if(i)i=!1;else if(l.name){let s=_ke[l.name];if(s&&s(l,a)||Ioe.has(l.name))return!1}else if(l.to-l.from>8192){for(let s of Moe(e,l.node))n.push(s);return!1}}),WQ.set(t,n),n}