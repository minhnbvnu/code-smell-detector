function topkImpl(e,t,n,r,o){for(var a=t[t.length-1],i=[e.length/a,a],s=i[0],u=i[1],l=getTypedArrayFromDType(n,s*r),c=getTypedArrayFromDType("int32",s*r),p=0;p<s;p++){for(var d=p*u,h=e.subarray(d,d+u),f=[],m=0;m<h.length;m++)f.push({value:h[m],index:m});f.sort(function(e,t){return t.value-e.value});var g=p*r,v=l.subarray(g,g+r),y=c.subarray(g,g+r);for(m=0;m<r;m++)v[m]=f[m].value,y[m]=f[m].index;}var x=t.slice();return x[x.length-1]=r,[tensor(l,x,n),tensor(c,x,"int32")]}