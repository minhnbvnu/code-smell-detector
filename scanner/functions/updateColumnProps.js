function updateColumnProps(){columnsById={};for(var e=0;e<columns.length;e++){columns[e].width&&(columns[e].widthRequest=columns[e].width);var o=columns[e]=$.extend({},columnDefaults,columns[e]);o.autoSize=$.extend({},columnAutosizeDefaults,o.autoSize),columnsById[o.id]=e,o.minWidth&&o.width<o.minWidth&&(o.width=o.minWidth),o.maxWidth&&o.width>o.maxWidth&&(o.width=o.maxWidth),o.resizable}}