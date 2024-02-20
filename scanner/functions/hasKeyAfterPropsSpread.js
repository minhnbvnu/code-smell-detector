function hasKeyAfterPropsSpread(node) {
                let spread = false;
                for (const elem of node.attributes.properties) {
                    if (isJsxSpreadAttribute(elem)) {
                        spread = true;
                    }
                    else if (spread && isJsxAttribute(elem) && elem.name.escapedText === "key") {
                        return true;
                    }
                }
                return false;
            }