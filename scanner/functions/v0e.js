function v0e(e,t,r){var i,a,n,s;if(e==="")return"rootData";if(e[0]=="/"){if(!h0e.test(e))throw new Error("Invalid JSON-pointer: "+e);a=e,n="rootData"}else{if(s=e.match(g0e),!s)throw new Error("Invalid JSON-pointer: "+e);if(i=+s[1],a=s[2],a=="#"){if(i>=t)throw new Error("Cannot access property/index "+i+" levels up, current level is "+t);return r[t-i]}if(i>t)throw new Error("Cannot access data "+i+" levels up, current level is "+t);if(n="data"+(t-i||""),!a)return n}for(var o=n,u=a.split("/"),l=0;l<u.length;l++){var p=u[l];p&&(n+=lx(dx(p)),o+=" && "+n)}return o}