function Tj(a,b,c,d){var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;a:{b:{c:{d:{e:{f:{g:{h:{i:{j:{k:{if(b){if(!c){break k}if(!d){break j}e=Q(d)-Q(b)|0;if(e>>>0<=31){break i}break c}if((d|0)==1|d>>>0>1){break c}da=0;a=(a>>>0)/(c>>>0)|0;break a}if(!a){break h}if(!d|d-1&d){break g}a=b>>>Qj(d)|0;da=0;break a}if(!(c-1&c)){break f}h=(Q(c)+33|0)-Q(b)|0;g=0-h|0;break d}h=e+1|0;g=63-e|0;break d}da=0;a=(b>>>0)/(d>>>0)|0;break a}e=Q(d)-Q(b)|0;if(e>>>0<31){break e}break c}if((c|0)==1){break b}d=Qj(c);c=d&31;if((d&63)>>>0>=32){a=b>>>c|0}else{e=b>>>c|0;a=((1<<c)-1&b)<<32-c|a>>>c}da=e;break a}h=e+1|0;g=63-e|0}e=h&63;f=e&31;if(e>>>0>=32){e=0;i=b>>>f|0}else{e=b>>>f|0;i=((1<<f)-1&b)<<32-f|a>>>f}g=g&63;f=g&31;if(g>>>0>=32){b=a<<f;a=0}else{b=(1<<f)-1&a>>>32-f|b<<f;a=a<<f}if(h){f=d-1|0;g=c-1|0;m=(g|0)!=-1?f+1|0:f;while(1){j=e<<1|i>>>31;e=i<<1|b>>>31;f=m-(j+(e>>>0>g>>>0)|0)>>31;k=c&f;i=e-k|0;e=j-((d&f)+(e>>>0<k>>>0)|0)|0;b=b<<1|a>>>31;a=l|a<<1;l=f&1;h=h-1|0;if(h){continue}break}}da=b<<1|a>>>31;a=l|a<<1;break a}a=0;b=0}da=b}return a}