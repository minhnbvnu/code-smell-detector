function An(t,n){this.b={},this.a=[],this.c=0;var e=arguments.length;if(1<e){if(e%2)throw Error("Uneven number of arguments");for(var i=0;i<e;i+=2)this.set(arguments[i],arguments[i+1])}else if(t){t instanceof An?(e=t.S(),i=t.P()):(e=_(t),i=R(t));for(var r=0;r<e.length;r++)this.set(e[r],i[r])}}