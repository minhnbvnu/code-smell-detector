function gee(e,t){if(e.length===0)return iIe;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),i=0;for(let a=0;a<e.length;a++){let n=e[a];r.set(n,i),i+=n.length}return i<t?r.slice(0,i):r}