function _ue(e,{EOL:t=`
`,finalEOL:r=!0,replacer:i=null,spaces:a}={}){let n=r?t:"";return JSON.stringify(e,i,a).replace(/\n/g,t)+n}