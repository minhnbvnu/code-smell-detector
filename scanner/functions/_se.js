function _se(e){return t;function t(r,n){let i=-1,a;for(;++i<=r.length;)a===void 0?r[i]&&r[i][1].type==="data"&&(a=i,i++):(!r[i]||r[i][1].type!=="data")&&(i!==a+2&&(r[a][1].end=r[i-1][1].end,r.splice(a+2,i-a-2),i=a+2),a=void 0);return e?e(r,n):r}}