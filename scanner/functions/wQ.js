function wQ(){oE=!0,bQ=[0,1,2,4,8,16,32,64,128,27,54];for(var e=new Array(256),t=0;t<128;++t)e[t]=t<<1,e[t+128]=t+128<<1^283;bn=new Array(256),uE=new Array(256),Qc=new Array(4),no=new Array(4);for(var t=0;t<4;++t)Qc[t]=new Array(256),no[t]=new Array(256);for(var r=0,i=0,a,n,s,o,u,l,p,t=0;t<256;++t){o=i^i<<1^i<<2^i<<3^i<<4,o=o>>8^o&255^99,bn[r]=o,uE[o]=r,u=e[o],a=e[r],n=e[a],s=e[n],l=u<<24^o<<16^o<<8^(o^u),p=(a^n^s)<<24^(r^s)<<16^(r^n^s)<<8^(r^a^s);for(var c=0;c<4;++c)Qc[c][r]=l,no[c][o]=p,l=l<<24|l>>>8,p=p<<24|p>>>8;r===0?r=i=1:(r=a^e[e[e[a^s]]],i^=e[e[i]])}}