function NO(t,e,r,n){var i,s,a,o,l,u,d,f,p,g,b,k,T,L,E;if(i=e.y-t.y,a=t.x-e.x,l=e.x*t.y-t.x*e.y,p=i*r.x+a*r.y+l,g=i*n.x+a*n.y+l,!(p!==0&&g!==0&&a3(p,g))&&(s=n.y-r.y,o=r.x-n.x,u=n.x*r.y-r.x*n.y,d=s*t.x+o*t.y+u,f=s*e.x+o*e.y+u,!(d!==0&&f!==0&&a3(d,f))&&(b=i*o-s*a,b!==0)))return k=Math.abs(b/2),T=a*u-o*l,L=T<0?(T-k)/b:(T+k)/b,T=s*l-i*u,E=T<0?(T-k)/b:(T+k)/b,{x:L,y:E}}