function Oat(n,t){var e,i;return function(){var r=ri(this,n),o=r.tween;if(o!==e){i=e=o;for(var s=0,a=i.length;s<a;++s)if(i[s].name===t){i=i.slice(),i.splice(s,1);break}}r.tween=i}}