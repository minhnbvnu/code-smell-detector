function rebound(p){if(p[0]<0){p[0]=0}if(p[1]<0){p[1]=0}if(p[0]>boundx){p[0]=boundx}if(p[1]>boundy){p[1]=boundy}return[p[0],p[1]]
}