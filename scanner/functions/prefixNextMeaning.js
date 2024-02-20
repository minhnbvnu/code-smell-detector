function prefixNextMeaning() {
                if (displayParts.length) {
                    displayParts.push(lineBreakPart());
                }
                addAliasPrefixIfNecessary();
            }