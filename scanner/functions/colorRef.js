function colorRef(type,x,y,z){var xx=x?valueRef("",x):vg.config.color[type][0],yy=y?valueRef("",y):vg.config.color[type][1],zz=z?valueRef("",z):vg.config.color[type][2];return"(this.d3."+type+"("+[xx,yy,zz].join(",")+') + "")'}