function KX(n){if(n!==1&&n!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");let t=XX(n);return t.addEventListener("webglcontextlost",e=>{e.preventDefault(),delete oa[n]},!1),n===1?t.getContext("webgl",K_)||t.getContext("experimental-webgl",K_):t.getContext("webgl2",K_)}