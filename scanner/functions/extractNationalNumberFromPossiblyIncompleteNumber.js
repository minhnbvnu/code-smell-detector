function extractNationalNumberFromPossiblyIncompleteNumber(i,o){if(i&&o.numberingPlan.nationalPrefixForParsing()){var s=new RegExp("^(?:"+o.numberingPlan.nationalPrefixForParsing()+")"),u=s.exec(i);if(u){var C,_,w,P=u.length-1,B=P>0&&u[P];if(o.nationalPrefixTransformRule()&&B)C=i.replace(s,o.nationalPrefixTransformRule()),P>1&&(_=u[1]);else{var z=u[0];C=i.slice(z.length),B&&(_=u[1])}if(B){var U=i.indexOf(u[1]);i.slice(0,U)===o.numberingPlan.nationalPrefix()&&(w=o.numberingPlan.nationalPrefix())}else w=u[0];return{nationalNumber:C,nationalPrefix:w,carrierCode:_}}}return{nationalNumber:i}}