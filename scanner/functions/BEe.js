function BEe(e){let t=function(...r){let i=r[0];if(i==null)return i;i.length>1&&(r=i);let a=e(r);if(typeof a=="object")for(let n=a.length,s=0;s<n;s++)a[s]=Math.round(a[s]);return a};return"conversion"in e&&(t.conversion=e.conversion),t}