function atrule(toks,i,n,handler,blockok){var start=i++;while(i<n&&toks[i]!=="{"&&toks[i]!==";"){++i}if(i<n&&(blockok||toks[i]===";")){var s=start+1,e=i;if(s<n&&toks[s]===" "){++s}if(e>s&&toks[e-1]===" "){--e}if(handler["startAtrule"]){handler["startAtrule"](toks[start].toLowerCase(),toks.slice(s,e))}i=toks[i]==="{"?block(toks,i,n,handler):i+1;if(handler["endAtrule"]){handler["endAtrule"]()}}return i}