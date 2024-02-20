function containsLabel(labelToFind, labelArray) {
                return labelArray.some(function (label) {
                    return label.name === labelToFind.name;
                });
            }