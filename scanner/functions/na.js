function na(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d==typeof b&&
"object"==d)if(M(a)){if(!M(b))return!1;if((d=a.length)==b.length){for(c=0;c<d;c++)if(!na(a[c],b[c]))return!1;return!0}}else{if(fa(a))return fa(b)?na(a.getTime(),b.getTime()):!1;if(Za(a))return Za(b)?a.toString()==b.toString():!1;if(ab(a)||ab(b)||Ya(a)||Ya(b)||M(b)||fa(b)||Za(b))return!1;d=V();for(c in a)if("$"!==c.charAt(0)&&!D(a[c])){if(!na(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&A(b[c])&&!D(b[c]))return!1;return!0}return!1}