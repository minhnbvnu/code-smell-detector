function h9e(e){for(var t=[],r=Object.keys(e),i=0,a=r.length;i<a;++i){var n=r[i],s=e[n],n=n.toLowerCase();n.indexOf("x-amz")===0&&t.push(n+":"+s)}return t.sort().join(`
`)}