function I6(t){var e=t.grouping===void 0||t.thousands===void 0?jf:L6($f.call(t.grouping,Number),t.thousands+""),r=t.currency===void 0?"":t.currency[0]+"",n=t.currency===void 0?"":t.currency[1]+"",i=t.decimal===void 0?".":t.decimal+"",s=t.numerals===void 0?jf:D6($f.call(t.numerals,String)),a=t.percent===void 0?"%":t.percent+"",o=t.minus===void 0?"\u2212":t.minus+"",l=t.nan===void 0?"NaN":t.nan+"";function u(f){f=Bl(f);var p=f.fill,g=f.align,b=f.sign,k=f.symbol,T=f.zero,L=f.width,E=f.comma,I=f.precision,V=f.trim,H=f.type;H==="n"?(E=!0,H="g"):qf[H]||(I===void 0&&(I=12),V=!0,H="g"),(T||p==="0"&&g==="=")&&(T=!0,p="0",g="=");var G=k==="$"?r:k==="#"&&/[boxX]/.test(H)?"0"+H.toLowerCase():"",Y=k==="$"?n:/[%p]/.test(H)?a:"",W=qf[H],N=/[defgprs%]/.test(H);I=I===void 0?6:/[gprs]/.test(H)?Math.max(1,Math.min(21,I)):Math.max(0,Math.min(20,I));function D(w){var v=G,M=Y,m,Q,x;if(H==="c")M=W(w)+M,w="";else{w=+w;var ct=w<0||1/w<0;if(w=isNaN(w)?l:W(Math.abs(w),I),V&&(w=N6(w)),ct&&+w==0&&b!=="+"&&(ct=!1),v=(ct?b==="("?b:o:b==="-"||b==="("?"":b)+v,M=(H==="s"?Xf[8+Hf/3]:"")+M+(ct&&b==="("?")":""),N){for(m=-1,Q=w.length;++m<Q;)if(x=w.charCodeAt(m),48>x||x>57){M=(x===46?i+w.slice(m+1):w.slice(m))+M,w=w.slice(0,m);break}}}E&&!T&&(w=e(w,1/0));var Dt=v.length+w.length+M.length,kt=Dt<L?new Array(L-Dt+1).join(p):"";switch(E&&T&&(w=e(kt+w,kt.length?L-M.length:1/0),kt=""),g){case"<":w=v+w+M+kt;break;case"=":w=v+kt+w+M;break;case"^":w=kt.slice(0,Dt=kt.length>>1)+v+w+M+kt.slice(Dt);break;default:w=kt+v+w+M;break}return s(w)}return D.toString=function(){return f+""},D}function d(f,p){var g=u((f=Bl(f),f.type="f",f)),b=Math.max(-8,Math.min(8,Math.floor(Hs(p)/3)))*3,k=Math.pow(10,-b),T=Xf[8+b/3];return function(L){return g(k*L)+T}}return{format:u,formatPrefix:d}}