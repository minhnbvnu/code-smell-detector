function x4(b){b=b|0;var d=0,e=0,f=0;f=l;l=l+16|0;e=f;sa(0,e|0)|0;d=0;e=(c[e+4>>2]|0)*65537^(e>>>4)+b;while(1){a[b+d>>0]=(e&15)+65|e<<1&32;d=d+1|0;if((d|0)==6)break;else e=e>>>5}l=f;return b|0}