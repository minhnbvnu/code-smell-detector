function gfn2(v){var w=v<0?12:11;var o=gfn5(v.toFixed(12));if(o.length<=w)return o;o=v.toPrecision(10);if(o.length<=w)return o;return v.toExponential(5)}