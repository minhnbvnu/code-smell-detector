function dk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;c=a+36|0;d=a+40|0;e=f[c>>2]|0;if((f[d>>2]|0)==(e|0)){g=1;return g|0}h=a+60|0;a=0;i=e;while(1){e=f[i+(a<<2)>>2]|0;a=a+1|0;if(!(Sa[f[(f[e>>2]|0)+20>>2]&31](e,h,b)|0)){g=0;j=5;break}i=f[c>>2]|0;if(a>>>0>=(f[d>>2]|0)-i>>2>>>0){g=1;j=5;break}}if((j|0)==5)return g|0;return 0}