function updateColumnCaches(){columnPosLeft=[],columnPosRight=[];for(var e=0,o=0,t=columns.length;o<t;o++)columnPosLeft[o]=e,columnPosRight[o]=e+columns[o].width,options.frozenColumn==o?e=0:e+=columns[o].width}