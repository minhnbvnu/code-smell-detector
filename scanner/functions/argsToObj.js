function argsToObj(b){var c=toArray(b).map(function(a){return typeof a});var d={};if(c[0]==='object')d=b[0];else if(c[0]==='string'){var e=b[0].split(' ');for(var i in e)d[e[i]]=b[1]}else if(c[0]==='function')d={'':b[0]};return d}