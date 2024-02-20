function oOe(e){let t=!1,r=`ipconfig getpacket "${e}" 2>/dev/null | grep lease_time;`;try{let i=Mi(r).toString().split(`
`);i.length&&i[0].startsWith("lease_time")&&(t=!0)}catch{Rt.noop()}return t}