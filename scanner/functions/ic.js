function Ic(a){var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;H[a+56>>2]=H[a+52>>2];H[a+44>>2]=H[a+40>>2];b=H[a+64>>2];c=H[b+24>>2];if((c|0)==H[b+28>>2]){return 1}a:{b:{c:{while(1){g=i;i=H[(k<<2)+c>>2];d:{if((i|0)==-1){i=g;break d}b=H[a+56>>2];e:{if((b|0)!=H[a+60>>2]){H[b>>2]=g;H[a+56>>2]=b+4;break e}d=H[a+52>>2];e=b-d|0;h=e>>2;c=h+1|0;if(c>>>0>=1073741824){break c}f=e>>>1|0;f=e>>>0>=2147483644?1073741823:c>>>0<f>>>0?f:c;if(f){if(f>>>0>=1073741824){break b}e=pa(f<<2)}else{e=0}c=e+(h<<2)|0;H[c>>2]=g;h=c+4|0;if((b|0)!=(d|0)){while(1){c=c-4|0;b=b-4|0;H[c>>2]=H[b>>2];if((b|0)!=(d|0)){continue}break}}H[a+60>>2]=e+(f<<2);H[a+56>>2]=h;H[a+52>>2]=c;if(!d){break e}oa(d)}f:{g:{if(!(H[H[a+12>>2]+(k>>>3&536870908)>>2]>>>k&1)){break g}e=i+1|0;e=(e>>>0)%3|0?e:i-2|0;if((e|0)==-1|H[H[a>>2]+(e>>>3&536870908)>>2]>>>e&1){break g}e=H[H[H[a+64>>2]+12>>2]+(e<<2)>>2];if((e|0)==-1){break g}b=e+1|0;b=(b>>>0)%3|0?b:e-2|0;if((b|0)==-1){break g}c=H[a+64>>2];f=H[a>>2];while(1){e=b;b=-1;d=e+1|0;d=(d>>>0)%3|0?d:e-2|0;h:{if((d|0)==-1|H[f+(d>>>3&536870908)>>2]>>>d&1){break h}d=H[H[c+12>>2]+(d<<2)>>2];if((d|0)==-1){break h}b=d+1|0;b=(b>>>0)%3|0?b:d-2|0}if((b|0)!=(i|0)){if((b|0)==-1){break f}continue}break}return 0}e=i}H[H[a+28>>2]+(e<<2)>>2]=g;b=H[a+44>>2];i:{if((b|0)!=H[a+48>>2]){H[b>>2]=e;H[a+44>>2]=b+4;break i}d=H[a+40>>2];i=b-d|0;h=i>>2;c=h+1|0;if(c>>>0>=1073741824){break a}f=i>>>1|0;f=i>>>0>=2147483644?1073741823:c>>>0<f>>>0?f:c;if(f){if(f>>>0>=1073741824){break b}i=pa(f<<2)}else{i=0}c=i+(h<<2)|0;H[c>>2]=e;h=c+4|0;if((b|0)!=(d|0)){while(1){c=c-4|0;b=b-4|0;H[c>>2]=H[b>>2];if((b|0)!=(d|0)){continue}break}}H[a+48>>2]=i+(f<<2);H[a+44>>2]=h;H[a+40>>2]=c;if(!d){break i}oa(d)}i=g+1|0;b=H[a+64>>2];if((e|0)==-1){break d}j:{if((e>>>0)%3|0){c=e-1|0;break j}c=e+2|0;if((c|0)==-1){break d}}d=H[H[b+12>>2]+(c<<2)>>2];if((d|0)==-1){break d}f=d+((d>>>0)%3|0?-1:2)|0;if((f|0)==-1|(e|0)==(f|0)){break d}while(1){b=f+1|0;b=(b>>>0)%3|0?b:f-2|0;if(H[H[a>>2]+(b>>>3&536870908)>>2]>>>b&1){b=H[a+56>>2];k:{if((b|0)!=H[a+60>>2]){H[b>>2]=i;H[a+56>>2]=b+4;break k}d=H[a+52>>2];g=b-d|0;j=g>>2;c=j+1|0;if(c>>>0>=1073741824){break c}h=g>>>1|0;h=g>>>0>=2147483644?1073741823:c>>>0<h>>>0?h:c;if(h){if(h>>>0>=1073741824){break b}g=pa(h<<2)}else{g=0}c=g+(j<<2)|0;H[c>>2]=i;j=c+4|0;if((b|0)!=(d|0)){while(1){c=c-4|0;b=b-4|0;H[c>>2]=H[b>>2];if((b|0)!=(d|0)){continue}break}}H[a+60>>2]=g+(h<<2);H[a+56>>2]=j;H[a+52>>2]=c;if(!d){break k}oa(d)}d=i+1|0;b=H[a+44>>2];l:{if((b|0)!=H[a+48>>2]){H[b>>2]=f;H[a+44>>2]=b+4;break l}h=H[a+40>>2];g=b-h|0;l=g>>2;c=l+1|0;if(c>>>0>=1073741824){break a}j=g>>>1|0;j=g>>>0>=2147483644?1073741823:c>>>0<j>>>0?j:c;if(j){if(j>>>0>=1073741824){break b}g=pa(j<<2)}else{g=0}c=g+(l<<2)|0;H[c>>2]=f;l=c+4|0;if((b|0)!=(h|0)){while(1){c=c-4|0;b=b-4|0;H[c>>2]=H[b>>2];if((b|0)!=(h|0)){continue}break}}H[a+48>>2]=g+(j<<2);H[a+44>>2]=l;H[a+40>>2]=c;if(!h){break l}oa(h)}g=i;i=d}H[H[a+28>>2]+(f<<2)>>2]=g;b=H[a+64>>2];m:{if((f>>>0)%3|0){c=f-1|0;break m}c=f+2|0;if((c|0)==-1){break d}}d=H[H[b+12>>2]+(c<<2)>>2];if((d|0)==-1){break d}f=d+((d>>>0)%3|0?-1:2)|0;if((f|0)==-1){break d}if((e|0)!=(f|0)){continue}break}}k=k+1|0;c=H[b+24>>2];if(k>>>0<H[b+28>>2]-c>>2>>>0){continue}break}return 1}sa();v()}wa();v()}sa();v()}