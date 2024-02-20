function w4(e){for(var t=e.name+": ",r=[],i=function(u,l){return" "+l},a=0;a<e.values.length;++a)r.push(e.values[a].replace(/^(\S+\r\n)/,i));t+=r.join(",")+`\r
`;for(var n=0,s=-1,a=0;a<t.length;++a,++n)if(n>65&&s!==-1){var o=t[s];o===","?(++s,t=t.substr(0,s)+`\r
 `+t.substr(s)):t=t.substr(0,s)+`\r
`+o+t.substr(s+1),n=a-s-1,s=-1,++a}else(t[a]===" "||t[a]==="	"||t[a]===",")&&(s=a);return t}