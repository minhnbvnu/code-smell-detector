function D4e(e){var t=e,r=1,i,a,n=[];return t.indexOf("_")!==-1&&(t=t.replace(/_/g,"")),i=t[0],(i==="-"||i==="+")&&(i==="-"&&(r=-1),t=t.slice(1),i=t[0]),t==="0"?0:i==="0"?t[1]==="b"?r*parseInt(t.slice(2),2):t[1]==="x"?r*parseInt(t,16):r*parseInt(t,8):t.indexOf(":")!==-1?(t.split(":").forEach(function(s){n.unshift(parseInt(s,10))}),t=0,a=1,n.forEach(function(s){t+=s*a,a*=60}),r*t):r*parseInt(t,10)}