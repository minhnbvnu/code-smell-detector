function MV(t){var e=["x","y"],n=["width","height"];return{point:function(e,n,i){if(e){var r=i.range;return IV(e[t],r)}},rect:function(i,r,o){if(i){var a=o.range,s=[i[e[t]],i[e[t]]+i[n[t]]];return s[1]<s[0]&&s.reverse(),IV(s[0],a)||IV(s[1],a)||IV(a[0],s)||IV(a[1],s)}}}}