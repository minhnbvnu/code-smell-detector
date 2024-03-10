function y_axis(args){var svg=d3.select($(args.target).find('svg').get(0));var $svg=$($(args.target).find('svg').get(0));var g;var min_y,max_y;args.scalefns.yf=function(di){return args.scales.Y(di[args.y_accessor]);}
var min_y,max_y;var _set=false;for(var i=0;i<args.data.length;i++){var a=args.data[i];if(args.y_scale_type=='log'){a=a.filter(function(d){return d[args.y_accessor]>0;});}
if(a.length>0){var extent=d3.extent(a,function(d){return d[args.y_accessor];});if(!_set){min_y=extent[0];max_y=extent[1];_set=true;}else{min_y=Math.min(extent[0],min_y);max_y=Math.max(extent[1],max_y);}}}
if(min_y>=0&&!args.min_y&&!args.min_y_from_data){min_y=0;}
min_y=args.min_y?args.min_y:min_y;max_y=args.max_y?args.max_y:max_y;if(args.y_scale_type!='log'){if(min_y>=0){args.y_axis_negative=false;}else{min_y=min_y-(max_y*(args.inflator-1));args.y_axis_negative=true;}}
max_y=max_y*args.inflator;if(!args.min_y&&args.min_y_from_data){min_y=min_y/args.inflator;}
if(args.y_scale_type=='log'){if(args.chart_type=='histogram'){min_y=0.2;}else{if(min_y<=0){min_y=1;}}
args.scales.Y=d3.scale.log().domain([min_y,max_y]).range([args.height-args.bottom-args.buffer,args.top]).clamp(true);}else{args.scales.Y=d3.scale.linear().domain([min_y,max_y]).range([args.height-args.bottom-args.buffer,args.top]);}
args.scales.Y_axis=d3.scale.linear().domain([min_y,max_y]).range([args.height-args.bottom-args.buffer,args.top]);var yax_format;if(args.format=='count'){yax_format=function(f){if(f<1.0){return args.yax_units+d3.round(f,args.decimals);}else{var pf=d3.formatPrefix(f);return args.yax_units+pf.scale(f)+pf.symbol;}};}
else{yax_format=function(d_){var n=d3.format('%p');return n(d_);}}
$svg.find('.y-axis').remove();if(!args.y_axis)return this;g=svg.append('g').classed('y-axis',true).classed('y-axis-small',args.use_small_class);if(args.y_label){g.append('text').attr('class','label').attr('x',function(){return-1*(args.top+args.buffer+
((args.height-args.bottom-args.buffer)
-(args.top+args.buffer))/2);}).attr('y',function(){return args.left/2;}).attr("dy","0.4em").attr('text-anchor','middle').text(function(d){return args.y_label;}).attr("transform",function(d){return"rotate(-90)";});}
var scale_ticks=args.scales.Y.ticks(args.yax_count);function log10(val){if(val==1000){return 3;}
if(val==1000000){return 7;}
return Math.log(val)/Math.LN10;}
if(args.y_scale_type=='log'){scale_ticks=scale_ticks.filter(function(d){return Math.abs(log10(d))%1<1e-6||Math.abs(log10(d))%1>1-1e-6;});}
var number_of_ticks=args.scales.Y.ticks(args.yax_count).length;var data_is_int=true;$.each(args.data,function(i,d){$.each(d,function(i,d){if(d[args.y_accessor]%1!==0){data_is_int=false;return false;}});});if(data_is_int&&number_of_ticks>max_y&&args.format=='count'){scale_ticks=scale_ticks.filter(function(d){return d%1===0;});}
var last_i=scale_ticks.length-1;if(!args.x_extended_ticks&&!args.y_extended_ticks){g.append('line').attr('x1',args.left).attr('x2',args.left).attr('y1',args.scales.Y(scale_ticks[0]).toFixed(2)).attr('y2',args.scales.Y(scale_ticks[last_i]).toFixed(2));}
g.selectAll('.yax-ticks').data(scale_ticks).enter().append('line').classed('extended-y-ticks',args.y_extended_ticks).attr('x1',args.left).attr('x2',function(){return(args.y_extended_ticks)?args.width-args.right:args.left-args.yax_tick_length;}).attr('y1',function(d){return args.scales.Y(d).toFixed(2);}).attr('y2',function(d){return args.scales.Y(d).toFixed(2);});g.selectAll('.yax-labels').data(scale_ticks).enter().append('text').attr('x',args.left-args.yax_tick_length*3/2).attr('dx',-3).attr('y',function(d){return args.scales.Y(d).toFixed(2);}).attr('dy','.35em').attr('text-anchor','end').text(function(d,i){var o=yax_format(d);return o;})
if(args.y_rug){y_rug(args);}
return this;}