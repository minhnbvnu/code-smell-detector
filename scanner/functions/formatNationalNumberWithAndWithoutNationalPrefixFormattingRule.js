function formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(i,o,s){var u=s.metadata,C=s.shouldTryNationalPrefixFormattingRule,_=s.getSeparatorAfterNationalPrefix;i.nationalSignificantNumber,i.international,i.nationalPrefix,i.carrierCode;if(C(o)){var w=AsYouTypeFormatter_complete_formatNationalNumber(i,o,{useNationalPrefixFormattingRule:!0,getSeparatorAfterNationalPrefix:_,metadata:u});if(w)return w}return AsYouTypeFormatter_complete_formatNationalNumber(i,o,{useNationalPrefixFormattingRule:!1,getSeparatorAfterNationalPrefix:_,metadata:u})}