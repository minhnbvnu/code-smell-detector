function createButton(dataURL, myFile, myContent, myClass) {
                var exportButton = "<a href='" + dataURL + "' download='" + myFile + "' role='button' class='" + bootstrapClass + bootstrapTheme + myClass + "'>" + myContent + "</a>";
                checkCaption(exportButton);
            }