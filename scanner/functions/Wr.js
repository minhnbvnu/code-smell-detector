function Wr(t,e,i){var n,o,r,s=Math.floor(6*t),a=6*t-s,l=i*(1-e),h=i*(1-a*e),u=i*(1-(1-a)*e);switch(s%6){case 0:n=i,o=u,r=l;break;case 1:n=h,o=i,r=l;break;case 2:n=l,o=i,r=u;break;case 3:n=l,o=h,r=i;break;case 4:n=u,o=l,r=i;break;case 5:n=i,o=l,r=h}return{r:Math.floor(255*n),g:Math.floor(255*o),b:Math.floor(255*r)}}