function parse_cc_xml(data,opts){var d=[];var l=0,i=1;(data.match(tagregex)||[]).forEach(function(x){var y=parsexmltag(x);switch(y[0]){case"<?xml":break;case"<calcChain":case"<calcChain>":case"</calcChain>":break;case"<c":delete y[0];if(y.i)i=y.i;else y.i=i;d.push(y);break}});return d}