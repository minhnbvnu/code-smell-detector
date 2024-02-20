function eK(n,t){let e=tK.exec(t);if(e==null){console.log(`Couldn't parse line number in error: ${t}`),console.log(n);return}let i=+e[1],r=n.split(`
`),o=r.length.toString().length+2,s=r.map((h,p)=>R.rightPad((p+1).toString(),o)+h),a=0;for(let h=0;h<s.length;h++)a=Math.max(s[h].length,a);let l=s.slice(0,i-1),c=s.slice(i-1,i),u=s.slice(i);console.log(l.join(`
`)),console.log(t.split(`
`)[0]),console.log(`%c ${R.rightPad(c[0],a)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(u.join(`
`))}