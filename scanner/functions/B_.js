function B_(t,e,n){for(var i=[],r=e[0],o=e[1],a=0;a<t.length;a+=2){var s=t.charCodeAt(a)-64,l=t.charCodeAt(a+1)-64;s=s>>1^-(1&s),l=l>>1^-(1&l),r=s+=r,o=l+=o,i.push([s/n,l/n])}return i}