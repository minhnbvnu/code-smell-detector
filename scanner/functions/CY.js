function CY(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;c=+h[a+16>>3];do if(!(c<1.0e-07&c>-1.0e-07)){d=+h[a+8>>3]/(c*2.0);c=d*d-+h[a>>3]/c;if(!(c<0.0))if(c==0.0){h[b>>3]=-d;a=1;break}else{c=+C(+c)-d;h[b>>3]=c;h[b+8>>3]=d*-2.0-c;a=2;break}else a=0}else a=DY(a,b)|0;while(0);return a|0}