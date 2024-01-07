function a5($,z,v,i,y,A){var B=A.length,r=$.n;if(y+1==$.v)r=$.h-y*$.n;var W=6*$.h*i+y*$.n;
for(var o=0;o<6;o++){for(var J=0;J<r;J++){var K=A[o%B][J%B],f;if(K==0){f=n+(o>>>1)}else if(K==2){f=Y+(o>>>1)}else{f=l+o}var E=$.o?(J*2/3&2147483646|J%3&1)+(J%3>>>1):J>>>1;
z[W+J]=v[f][E+1]}W+=$.h}}