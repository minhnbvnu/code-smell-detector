function jK(n,t,e){if(n===1)return`rc > ${t[0]}`;let i="";for(let r=n-2;r<n;r++)i+=`${e[r]} >= ${t[r]}`,r<n-1&&(i+="||");return i}