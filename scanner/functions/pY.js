function pY(n){let t=n.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],i=new Array(t);for(let r=0;r<n.length;r++)i[n[r]]=e[r];return i.join()}