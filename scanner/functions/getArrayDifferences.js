function getArrayDifferences(a1,a2){var i,k,a=[],diff=[];for(i=0;i<a1.length;i++)a[a1[i]]=!0;for(i=0;i<a2.length;i++)a[a2[i]]?delete a[a2[i]]:a[a2[i]]=!0;for(k in a)diff.push(k);return diff}