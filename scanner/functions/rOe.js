function rOe(){let e="/sbin/ifconfig -v";try{let t=Mi(e,{maxBuffer:1024*2e4}).toString().split(`
`),r=hre(t);return tOe(r)}catch{return[]}}