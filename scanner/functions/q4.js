function q4(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=a+4|0;if(b>>>0>31){e=c[f>>2]|0;c[a>>2]=e;c[f>>2]=0;b=b+-32|0;d=0}else{d=c[f>>2]|0;e=c[a>>2]|0}c[a>>2]=d<<32-b|e>>>b;c[f>>2]=d>>>b;return}