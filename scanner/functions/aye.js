function aye(e,t,r,i){Od.open(e,"r+",(a,n)=>{if(a)return i(a);Od.futimes(n,t,r,s=>{Od.close(n,o=>{i&&i(s||o)})})})}