function raw_data_transformation(args){'use strict';if(!$.isArray(args.data[0]))
args.data=[args.data];if($.isArray(args.y_accessor)){args.data=args.data.map(function(_d){return args.y_accessor.map(function(ya){return _d.map(function(di){di=clone(di);if(di[ya]==undefined){return undefined;}
di['multiline_y_accessor']=di[ya];return di;}).filter(function(di){return di!=undefined;})})})[0];args.y_accessor='multiline_y_accessor';}
if(args.chart_type=='line'){for(var i=0;i<args.data.length;i++){args.data[i].sort(function(a,b){return a[args.x_accessor]-b[args.x_accessor];});}}
return this}