function process_line(args){'use strict';var is_time_series=($.type(args.data[0][0][args.x_accessor])=='date')?true:false;if(args.missing_is_zero&&args.chart_type=='line'&&is_time_series){for(var i=0;i<args.data.length;i++){var first=args.data[i][0];var last=args.data[i][args.data[i].length-1];var processed_data=[];var start_date=clone(first[args.x_accessor]).setDate(first[args.x_accessor].getDate()+1);var from=(args.min_x)?args.min_x:start_date;var upto=(args.max_x)?args.max_x:last[args.x_accessor];for(var d=new Date(from);d<=upto;d.setDate(d.getDate()+1)){var o={};d.setHours(0,0,0,0);if(Date.parse(d)==Date.parse(new Date(start_date))){processed_data.push(clone(args.data[i][0]));}
var existing_o=null;$.each(args.data[i],function(i,val){if(Date.parse(val.date)==Date.parse(new Date(d))){existing_o=val;return false;}})
if(!existing_o){o[args.x_accessor]=new Date(d);o[args.y_accessor]=0;processed_data.push(o);}
else{processed_data.push(existing_o);}
if(Date.parse(d)==Date.parse(new Date(last[args.x_accessor]))){processed_data.push(last);}}
args.data[i]=processed_data;}}
return this;}