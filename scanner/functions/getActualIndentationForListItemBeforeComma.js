function getActualIndentationForListItemBeforeComma(commaToken, sourceFile, options) {
                        const commaItemInfo = findListItemInfo(commaToken);
                        if (commaItemInfo && commaItemInfo.listItemIndex > 0) {
                            return deriveActualIndentationFromList(commaItemInfo.list.getChildren(), commaItemInfo.listItemIndex - 1, sourceFile, options);
                        }
                        else {
                            return -1 /* Unknown */;
                        }
                    }