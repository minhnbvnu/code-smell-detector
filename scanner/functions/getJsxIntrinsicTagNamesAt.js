function getJsxIntrinsicTagNamesAt(location) {
                const intrinsics = getJsxType(JsxNames.IntrinsicElements, location);
                return intrinsics ? getPropertiesOfType(intrinsics) : emptyArray;
            }