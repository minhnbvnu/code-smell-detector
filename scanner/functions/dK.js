function dK(a){var b=dL(),c=d3.event,d=d3.event={type:a};b&&(d.x=b[0]+dH[0],d.y=b[1]+dH[1],d.dx=b[0]-dI[0],d.dy=b[1]-dI[1],dJ|=d.dx|d.dy,dI=b);try{dD[a].apply(dF,dG)}finally{d3.event=c}c.stopPropagation(),c.preventDefault()}