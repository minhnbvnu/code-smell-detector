function curve25519_raw(e,r){var c,o,n;o=r,c=core.dbl(o,core.ONE()),n=[o,core.ONE()];for(var t=255;0==core.getbit(e,t);)if(t--,0>t)return core.ZERO();t--;for(var u=[c,n];t>=0;){var s,d,i=core.getbit(e,t);s=core.sum(u[0][0],u[0][1],u[1][0],u[1][1],o),d=core.dbl(u[1-i][0],u[1-i][1]),u[1-i]=d,u[i]=s,t--}return n=u[1],n[1]=core.invmodp(n[1]),n[0]=core.mulmodp(n[0],n[1]),core.reduce(n[0]),n[0]}