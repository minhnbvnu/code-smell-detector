function jDe(e,t){var r=e.bitLength(),i,a=lp(1),n;if(r<=0)return a;r<18?i=1:r<48?i=3:r<144?i=4:r<768?i=5:i=6,r<8?n=new Zc(t):t.isEven()?n=new E1(t):n=new ef(t);var s=new Array,o=3,u=i-1,l=(1<<i)-1;if(s[1]=n.convert(this),i>1){var p=Cr();for(n.sqrTo(s[1],p);o<=l;)s[o]=Cr(),n.mulTo(p,s[o-2],s[o]),o+=2}var c=e.t-1,d,f=!0,m=Cr(),h;for(r=D4(e.data[c])-1;c>=0;){for(r>=u?d=e.data[c]>>r-u&l:(d=(e.data[c]&(1<<r+1)-1)<<u-r,c>0&&(d|=e.data[c-1]>>this.DB+r-u)),o=i;(d&1)==0;)d>>=1,--o;if((r-=o)<0&&(r+=this.DB,--c),f)s[d].copyTo(a),f=!1;else{for(;o>1;)n.sqrTo(a,m),n.sqrTo(m,a),o-=2;o>0?n.sqrTo(a,m):(h=a,a=m,m=h),n.mulTo(m,s[d],a)}for(;c>=0&&(e.data[c]&1<<r)==0;)n.sqrTo(a,m),h=a,a=m,m=h,--r<0&&(r=this.DB-1,--c)}return n.revert(a)}