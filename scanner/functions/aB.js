function ab(B,P,D,U,X){U=new Uint16Array(U.buffer);
var y=Date.now(),n=UTIF._binBE,S=P+D,O,q,i,M,m,aA,T,a8,a0,am,au,a3,aw,ao,v,ax,p,k;P+=4;while(P<S){var W=n.readShort(B,P),E=n.readUshort(B,P+2);
P+=4;if(W==12)O=E;else if(W==20)q=E;else if(W==21)i=E;else if(W==48)M=E;else if(W==53)m=E;else if(W==35)aA=E;
else if(W==62)T=E;else if(W==101)a8=E;else if(W==109)a0=E;else if(W==84)am=E;else if(W==106)au=E;else if(W==107)a3=E;
else if(W==108)aw=E;else if(W==102)ao=E;else if(W==104)v=E;else if(W==105)ax=E;else{var C=W<0?-W:W,F=C&65280,o=0;
if(C&ai){if(C&K){o=E&65535;o+=(C&255)<<16}else{o=E&65535}}if((C&a)==a){if(p==null){p=[];for(var f=0;
f<4;f++)p[f]=new Int16Array((q>>>1)*(i>>>1));k=new Int16Array((q>>>1)*(i>>>1));u=new Int16Array(1024);
for(var f=0;f<1024;f++){var aF=f-512,j=Math.abs(aF),O=Math.floor(768*j*j*j/(255*255*255))+j;u[f]=Math.sign(aF)*O}H=new Uint16Array(4096);
var al=(1<<16)-1;for(var f=0;f<4096;f++){var ad=f,az=al*(Math.pow(113,ad/4095)-1)/112;H[f]=Math.min(az,al)}}var Z=p[T],V=Q(q,1+d[M]),z=Q(i,1+d[M]);
if(M==0){for(var b=0;b<z;b++)for(var G=0;G<V;G++){var w=P+(b*V+G)*2;Z[b*(q>>>1)+G]=B[w]<<8|B[w+1]}}else{var aC=[B,P*8],aq=[],a5=0,ae=V*z,I=[0,0],s=0,E=0;
while(a5<ae){aj(aC,I);s=I[0];E=I[1];while(s>0){aq[a5++]=E;s--}}var $=(M-1)%3,aE=$!=1?V:0,as=$!=0?z:0;
for(var b=0;b<z;b++){var ay=(b+as)*(q>>>1)+aE,aa=b*V;for(var G=0;G<V;G++)Z[ay+G]=u[aq[aa+G]+512]*m}if($==2){var v=q>>>1,an=V*2,at=z*2;
for(var b=0;b<z;b++){for(var G=0;G<an;G++){var f=b*2*v+G,_=b*v+G,l=z*v+_;if(b==0)N(Z,k,f,l,_,v);else if(b==z-1)L(Z,k,f,l,_,v);
else g(Z,k,f,l,_,v)}}var h=Z;Z=k;k=h;for(var b=0;b<at;b++){for(var G=0;G<V;G++){var f=b*v+2*G,_=b*v+G,l=V+_;
if(G==0)N(Z,k,f,l,_,1);else if(G==V-1)L(Z,k,f,l,_,1);else g(Z,k,f,l,_,1)}}var h=Z;Z=k;k=h;var a6=[],aD=2-~~((M-1)/3);
for(var r=0;r<3;r++)a6[r]=a0>>14-r*2&3;var af=a6[aD];if(af!=0)for(var b=0;b<at;b++)for(var G=0;G<an;
G++){var f=b*v+G;Z[f]=Z[f]<<af}}}if(M==9&&T==3){var a2=p[0],ar=p[1],ah=p[2],a1=p[3];for(var b=0;b<i;
b+=2)for(var G=0;G<q;G+=2){var J=b*q+G,w=(b>>>1)*(q>>>1)+(G>>>1),R=a2[w],ak=ar[w]-2048,aB=ah[w]-2048,av=a1[w]-2048,a4=(ak<<1)+R,a9=(aB<<1)+R,ap=R+av,ag=R-av;
U[J]=t(a4);U[J+1]=t(ap);U[J+q]=t(ag);U[J+q+1]=t(a9)}}P+=o*4}else if(C==16388){P+=o*4}else if(F==8192||F==8448||F==9216){}else throw C.toString(16)}}console.log(Date.now()-y)}