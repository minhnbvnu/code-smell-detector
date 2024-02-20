function number_of_values(data,accessor,value){var values=data.filter(function(d){return d[accessor]===value;})
return values.length;}