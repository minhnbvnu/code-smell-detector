function CT(e){var t,n;return t=e.replace(/_/g,"").toLowerCase(),n=t[0]==="-"?-1:1,"+-".indexOf(t[0])>=0&&(t=t.slice(1)),t===".inf"?n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:t===".nan"?NaN:n*parseFloat(t,10)}