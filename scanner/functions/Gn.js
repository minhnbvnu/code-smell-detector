function Gn(t,e){1===arguments.length&&(arguments[0]?Rn(arguments[0])?(t=arguments[0],e=void 0):zn(arguments[0])&&(e=arguments[0],t=void 0):(t=void 0,e=void 0));var i=t||qi(),n=pn(i,this).startOf("day"),r=o.calendarFormat(this,n)||"sameElse",s=e&&(E(e[r])?e[r].call(this,i):e[r]);return this.format(s||this.localeData().calendar(r,this,qi(i)))}