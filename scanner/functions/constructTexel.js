function constructTexel(e,t,n,r){return 1===n?r%2==t%2?xTexelName(e,t):"vec4("+xTexelName(e,t-1)+".zw, "+xTexelName(e,t+1)+".xy)":r%2==t%2?"vec4("+xTexelName(e,t)+".xy, "+xTexelName(e,t+2)+".xy)":"vec4("+xTexelName(e,t-1)+".zw, "+xTexelName(e,t+1)+".zw)"}