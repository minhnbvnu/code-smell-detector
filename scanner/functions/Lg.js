function Lg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;d=u;u=u+16|0;e=d;f[e>>2]=b;g=a+8|0;if(((f[a+12>>2]|0)-(f[g>>2]|0)>>2|0)<=(b|0))Bh(g,b+1|0);h=f[(f[c>>2]|0)+56>>2]|0;do if((h|0)<5){i=a+20+(h*12|0)+4|0;j=f[i>>2]|0;if((j|0)==(f[a+20+(h*12|0)+8>>2]|0)){Ri(a+20+(h*12|0)|0,e);break}else{f[j>>2]=b;f[i>>2]=j+4;break}}while(0);b=f[c>>2]|0;h=f[e>>2]|0;f[b+60>>2]=h;e=(f[g>>2]|0)+(h<<2)|0;f[c>>2]=0;c=f[e>>2]|0;f[e>>2]=b;if(!c){u=d;return}b=c+88|0;e=f[b>>2]|0;f[b>>2]=0;if(e|0){b=f[e+8>>2]|0;if(b|0){h=e+12|0;if((f[h>>2]|0)!=(b|0))f[h>>2]=b;Oq(b)}Oq(e)}e=f[c+68>>2]|0;if(e|0){b=c+72|0;h=f[b>>2]|0;if((h|0)!=(e|0))f[b>>2]=h+(~((h+-4-e|0)>>>2)<<2);Oq(e)}e=c+64|0;h=f[e>>2]|0;f[e>>2]=0;if(h|0){e=f[h>>2]|0;if(e|0){b=h+4|0;if((f[b>>2]|0)!=(e|0))f[b>>2]=e;Oq(e)}Oq(h)}Oq(c);u=d;return}