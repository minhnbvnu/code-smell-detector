function mergeArrays(i,o){for(var s,u=i.slice(),C=mergeArrays_createForOfIteratorHelperLoose(o);!(s=C()).done;){var _=s.value;i.indexOf(_)<0&&u.push(_)}return u.sort((function(i,o){return i-o}))}