function yS(t,e,n,i,r,o,a,s,l){for(var u,h,c,p,d,f,g=n,y=0;y<i;y++){var v=e[2*g],m=e[2*g+1];if(g>=r||g<0)break;if(gS(v,m)){if(l){g+=o;continue}break}if(g===n)t[o>0?"moveTo":"lineTo"](v,m),c=v,p=m;else{var x=v-u,_=m-h;if(x*x+_*_<.5){g+=o;continue}if(a>0){for(var b=g+o,w=e[2*b],S=e[2*b+1];w===v&&S===m&&y<i;)y++,g+=o,w=e[2*(b+=o)],S=e[2*b+1],x=(v=e[2*g])-u,_=(m=e[2*g+1])-h;var M=y+1;if(l)for(;gS(w,S)&&M<i;)M++,w=e[2*(b+=o)],S=e[2*b+1];var I=.5,T=0,C=0,D=void 0,A=void 0;if(M>=i||gS(w,S))d=v,f=m;else{T=w-u,C=S-h;var k=v-u,L=w-v,P=m-h,O=S-m,R=void 0,N=void 0;if("x"===s){var E=T>0?1:-1;d=v-E*(R=Math.abs(k))*a,f=m,D=v+E*(N=Math.abs(L))*a,A=m}else if("y"===s){var z=C>0?1:-1;d=v,f=m-z*(R=Math.abs(P))*a,D=v,A=m+z*(N=Math.abs(O))*a}else R=Math.sqrt(k*k+P*P),d=v-T*a*(1-(I=(N=Math.sqrt(L*L+O*O))/(N+R))),f=m-C*a*(1-I),A=m+C*a*I,D=dS(D=v+T*a*I,fS(w,v)),A=dS(A,fS(S,m)),D=fS(D,dS(w,v)),f=m-(C=(A=fS(A,dS(S,m)))-m)*R/N,d=dS(d=v-(T=D-v)*R/N,fS(u,v)),f=dS(f,fS(h,m)),D=v+(T=v-(d=fS(d,dS(u,v))))*N/R,A=m+(C=m-(f=fS(f,dS(h,m))))*N/R}t.bezierCurveTo(c,p,d,f,v,m),c=D,p=A}else t.lineTo(v,m)}u=v,h=m,g+=o}return y}