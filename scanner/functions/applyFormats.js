function applyFormats(dataTable, tFormats, customFormatters) {
                    var formatType, FormatClass, requiresHtml = false;
                    if (!angular.isDefined(tFormats) || !angular.isDefined(dataTable)){
                        return { requiresHtml: false };
                    }
                    for (formatType in tFormats){
                        if (tFormats.hasOwnProperty(formatType)){
                            FormatClass = getFormatClass(formatType, customFormatters);
                            if (!angular.isFunction(FormatClass)){
                                // if no class constructor was returned,
                                // there's no point in completing cycle
                                continue;
                            }
                            applyFormat(formatType, FormatClass, tFormats);
                            
                            //Many formatters require HTML tags to display special formatting
                            if (formatType === 'arrow' || formatType === 'bar' || formatType === 'color') {
                                requiresHtml = true;
                            }
                        }
                    }
                    apply(tFormats, dataTable);
                    return { requiresHtml: requiresHtml };
                }