function EF(n){for(var t=this._groups,e=n._groups,i=t.length,r=e.length,o=Math.min(i,r),s=new Array(i),a=0;a<o;++a)for(var l=t[a],c=e[a],u=l.length,h=s[a]=new Array(u),p,d=0;d<u;++d)(p=l[d]||c[d])&&(h[d]=p);for(;a<i;++a)s[a]=t[a];return new wn(s,this._parents)}