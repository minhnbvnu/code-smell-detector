function lrt(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ii(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Kn(e,t)}else{if(ii(e,i))return;JD.set(i),n.uniformMatrix2fv(this.addr,!1,JD),Kn(e,i)}}