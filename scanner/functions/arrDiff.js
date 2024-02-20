function arrDiff(a,b){var seen=[],diff=[];for(var i=0;i<b.length;i++)
seen[b[i]]=true;for(var i=0;i<a.length;i++)
if(!seen[a[i]])
diff.push(a[i]);return diff;}