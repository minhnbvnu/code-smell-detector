function hY(n){let t=[];for(;t.length===0||t[t.length-1].outSize!==1;){let e=t.length?t[t.length-1].outSize:n[1],i=F.computeOptimalWindowSize(e);t.push({inSize:e,windowSize:i,outSize:Math.ceil(e/i)})}return t}