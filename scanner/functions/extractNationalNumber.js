function extractNationalNumber(i,o){var s=extractNationalNumberFromPossiblyIncompleteNumber(i,o),u=s.carrierCode,C=s.nationalNumber;if(C!==i){if(!shouldHaveExtractedNationalPrefix(i,C,o))return{nationalNumber:i};if(o.possibleLengths()&&!isPossibleIncompleteNationalNumber(C,o))return{nationalNumber:i}}return{nationalNumber:C,carrierCode:u}}