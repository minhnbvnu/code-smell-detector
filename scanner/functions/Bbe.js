function Bbe(e,t){if(t.length===0)return[];let r=[],n=new Map;for(let u of t){let c=u.parentKey,d=[u];for(;c;){let f=e.get(c);if(!f)break;if(n.has(f)){f.colspan++;let{column:h,index:p}=n.get(f);if(p>d.length)break;for(let m=p;m<d.length;m++)h.splice(m,0,null);for(let m=d.length;m<h.length;m++)h[m]&&n.has(h[m])&&(n.get(h[m]).index=m)}else f.colspan=1,d.push(f),n.set(f,{column:d,index:d.length-1});c=f.parentKey}r.push(d),u.index=r.length-1}let i=Math.max(...r.map(u=>u.length)),a=Array(i).fill(0).map(()=>[]),l=0;for(let u of r){let c=i-1;for(let d of u){if(d){let f=a[c],h=f.reduce((p,m)=>p+m.colspan,0);if(h<l){let p={type:"placeholder",key:"placeholder-"+d.key,colspan:l-h,index:h,value:null,rendered:null,level:c,hasChildNodes:!1,childNodes:[],textValue:null};f.length>0&&(f[f.length-1].nextKey=p.key,p.prevKey=f[f.length-1].key),f.push(p)}f.length>0&&(f[f.length-1].nextKey=d.key,d.prevKey=f[f.length-1].key),d.level=c,d.colIndex=l,f.push(d)}c--}l++}let s=0;for(let u of a){let c=u.reduce((d,f)=>d+f.colspan,0);if(c<t.length){let d={type:"placeholder",key:"placeholder-"+u[u.length-1].key,colspan:t.length-c,index:c,value:null,rendered:null,level:s,hasChildNodes:!1,childNodes:[],textValue:null,prevKey:u[u.length-1].key};u.push(d)}s++}return a.map((u,c)=>({type:"headerrow",key:"headerrow-"+c,index:c,value:null,rendered:null,level:0,hasChildNodes:!0,childNodes:u,textValue:null}))}