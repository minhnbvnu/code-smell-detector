function write_num_exp(fmt,val){var o;var idx=fmt.indexOf("E")-fmt.indexOf(".")-1;if(fmt.match(/^#+0.0E\+0$/)){var period=fmt.indexOf(".");if(period===-1)period=fmt.indexOf("E");var ee=Math.floor(Math.log(Math.abs(val))*Math.LOG10E)%period;if(ee<0)ee+=period;o=(val/Math.pow(10,ee)).toPrecision(idx+1+(period+ee)%period);if(o.indexOf("e")===-1){var fakee=Math.floor(Math.log(Math.abs(val))*Math.LOG10E);if(o.indexOf(".")===-1)o=o[0]+"."+o.substr(1)+"E+"+(fakee-o.length+ee);else o+="E+"+(fakee-ee);while(o.substr(0,2)==="0."){o=o[0]+o.substr(2,period)+"."+o.substr(2+period);o=o.replace(/^0+([1-9])/,"$1").replace(/^0+\./,"0.")}o=o.replace(/\+-/,"-")}o=o.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function($$,$1,$2,$3){return $1+$2+$3.substr(0,(period+ee)%period)+"."+$3.substr(ee)+"E"})}else o=val.toExponential(idx);if(fmt.match(/E\+00$/)&&o.match(/e[+-]\d$/))o=o.substr(0,o.length-1)+"0"+o[o.length-1];if(fmt.match(/E\-/)&&o.match(/e\+/))o=o.replace(/e\+/,"e");return o.replace("e","E")}