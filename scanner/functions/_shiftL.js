function _shiftL(t,n){for(var e=0,i=0;16>i;i++){var r=t[i]>>16-n;t[i]=t[i]<<n&65535|e,e=r}return t}