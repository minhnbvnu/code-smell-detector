function REe(e,t,r,n){var i=t?null:TEe(r),a=t?DEe(r):null;if(!e)return O.createElement("span",{style:i,key:n,className:a},r.content);for(var l=[],s=/(\s|^)(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g,u=0,c;(c=s.exec(r.content))!==null;){var d=c[1],f=c[2],h=c.index+d.length;h>u&&l.push(r.content.substring(u,h));var p=f.startsWith("www.")?"http://".concat(f):f;l.push(O.createElement("a",{key:u,href:p,target:"_blank"},"".concat(f))),u=s.lastIndex}return u<r.content.length&&l.push(r.content.substring(u)),O.createElement("span",{style:i,key:n,className:a},l)}