function cCe(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(e==16)t=4;else if(e==8)t=3;else if(e==2)t=1;else if(e==32)t=5;else if(e==4)t=2;else return this.toRadix(e);var r=(1<<t)-1,i,a=!1,n="",s=this.t,o=this.DB-s*this.DB%t;if(s-- >0)for(o<this.DB&&(i=this.data[s]>>o)>0&&(a=!0,n=XQ(i));s>=0;)o<t?(i=(this.data[s]&(1<<o)-1)<<t-o,i|=this.data[--s]>>(o+=this.DB-t)):(i=this.data[s]>>(o-=t)&r,o<=0&&(o+=this.DB,--s)),i>0&&(a=!0),a&&(n+=XQ(i));return a?n:"0"}