function dce(e,t){typeof e!="string"&&(M0.buffer(e,"buf"),e=e.toString("ascii"));var r=e.trim().replace(/[\\\r]/g,""),i=r.match(fce);i||(i=r.match(WA)),M0.ok(i,"key must match regex");var a=rd.algToKeyType(i[1]),n=Q8.from(i[2],"base64"),s,o={};if(i[4])try{s=rd.read(n)}catch{i=r.match(WA),M0.ok(i,"key must match regex"),n=Q8.from(i[2],"base64"),s=rd.readInternal(o,"public",n)}else s=rd.readInternal(o,"public",n);if(M0.strictEqual(a,s.type),i[4]&&i[4].length>0)s.comment=i[4];else if(o.consumed){var u=i[2]+(i[3]?i[3]:""),l=Math.ceil(o.consumed/3)*4;u=u.slice(0,l-2).replace(/[^a-zA-Z0-9+\/=]/g,"")+u.slice(l-2);var p=o.consumed%3;for(p>0&&u.slice(l-1,l)!=="="&&l--;u.slice(l,l+1)==="=";)l++;var c=u.slice(l);c=c.replace(/[\r\n]/g," ").replace(/^\s+/,""),c.match(/^[a-zA-Z0-9]/)&&(s.comment=c)}return s}