function getLayoutRect(i){var o=getBoundingClientRect(i),s=i.offsetWidth,u=i.offsetHeight;return Math.abs(o.width-s)<=1&&(s=o.width),Math.abs(o.height-u)<=1&&(u=o.height),{x:i.offsetLeft,y:i.offsetTop,width:s,height:u}}