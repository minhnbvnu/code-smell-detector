function qve(e){let t=null,r=SR().parser(!0,{}),i=[];return r.onopentag=a=>{let n=new Vb(a.name);if(n.attributes=a.attributes,t===null)t=n;else{let s=i[i.length-1];s.elements==null&&(s.elements=[]),s.elements.push(n)}i.push(n)},r.onclosetag=()=>{i.pop()},r.ontext=a=>{i.length>0&&(i[i.length-1].value=a)},r.oncdata=a=>{let n=i[i.length-1];n.value=a,n.isCData=!0},r.onerror=a=>{throw a},r.write(e),t}