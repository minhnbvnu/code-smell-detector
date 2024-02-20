function has_values_below(data,accessor,value){var values=data.filter(function(d){return d[accessor]<=value;})
return values.length>0;}