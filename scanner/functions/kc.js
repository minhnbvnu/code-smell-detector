function kc(a,b){var c=0,d=0,e=0,f=0,g=0,h=0,i=0;a:{c=H[a+4>>2];e=H[a>>2];d=c-e|0;b:{if(d>>>0<b>>>0){g=b-d|0;f=H[a+8>>2];if(g>>>0<=f-c>>>0){h=a,i=ra(c,0,g)+g|0,H[h+4>>2]=i;break b}if((b|0)<0){break a}c=f-e|0;f=c<<1;c=c>>>0>=1073741823?2147483647:b>>>0<f>>>0?f:b;f=pa(c);ra(f+d|0,0,g);d=va(f,e,d);H[a+8>>2]=d+c;H[a+4>>2]=b+d;H[a>>2]=d;if(!e){break b}oa(e);break b}if(b>>>0>=d>>>0){break b}H[a+4>>2]=b+e}b=H[a+28>>2];c=b;d=b+1|0;b=H[a+24>>2]+1|0;e=b?c:d;H[a+24>>2]=b;H[a+28>>2]=e;return}sa();v()}