function mve(e){let{namespace:t,useColors:r}=this;if(r){let i=this.color,a="[3"+(i<8?i:"8;5;"+i),n=`  ${a};1m${t} [0m`;e[0]=n+e[0].split(`
`).join(`
`+n),e.push(a+"m+"+Hv.exports.humanize(this.diff)+"[0m")}else e[0]=hve()+t+" "+e[0]}