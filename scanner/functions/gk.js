function gk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;c=a+8|0;d=f[a>>2]|0;if((f[c>>2]|0)-d>>2>>>0>=b>>>0)return;e=a+4|0;if(b>>>0>1073741823){g=ra(8)|0;Oo(g,16035);f[g>>2]=7256;va(g|0,1112,110)}g=(f[e>>2]|0)-d|0;h=ln(b<<2)|0;if((g|0)>0)kh(h|0,d|0,g|0)|0;f[a>>2]=h;f[e>>2]=h+(g>>2<<2);f[c>>2]=h+(b<<2);if(!d)return;Oq(d);return}