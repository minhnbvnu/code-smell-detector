function merge_with_defaults(obj){each(Array.prototype.slice.call(arguments,1),function(source){if(source){for(var prop in source){if(obj[prop]===void 0)obj[prop]=source[prop];}}})
return obj;}