function parse_BrtHLink(data,length,opts){var end=data.l+length;var rfx=parse_UncheckedRfX(data,16);var relId=parse_XLNullableWideString(data);var loc=parse_XLWideString(data);var tooltip=parse_XLWideString(data);var display=parse_XLWideString(data);data.l=end;return{rfx:rfx,relId:relId,loc:loc,tooltip:tooltip,display:display}}