function prevNode(e,n){var a=n.split(','),i;while((e=e.previousSibling)!=null){for(i=0;i<a.length;i++){if(e.nodeName==a[i])return e;}}return null;}