function chooseFormatForNumber(i,o){for(var s,u=format_createForOfIteratorHelperLoose(i);!(s=u()).done;){var C=s.value;if(C.leadingDigitsPatterns().length>0){var _=C.leadingDigitsPatterns()[C.leadingDigitsPatterns().length-1];if(0!==o.search(_))continue}if(matchesEntirely(o,C.pattern()))return C}}