function aj(B,P){if(x==null){x={};
for(var D=0;D<e.length;D+=4)x[e[D+1]]=e.slice(D,D+4)}var U=A(B),X=x[U];while(X==null){U=U<<1|A(B);X=x[U]}var y=X[3];
if(y!=0)y=A(B)==0?y:-y;P[0]=X[2];P[1]=y}