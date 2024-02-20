function getDetectDuplicatesFunction() {
    return function(cleanedDataArray, targetColumns) {
        var duplicates = {};

        for(var colCounter = 0; colCounter < targetColumns.length; colCounter++) {
            var targetColumn = targetColumns[colCounter];

            var localCacheData = {};

            // First pass through
            if(colCounter === 0) {

                // Compose the list of duplicates
                for(var i = 0; i < cleanedDataArray.length; i++) {
                    var row = cleanedDataArray[i];
                    if(typeof row !== "undefined") {
                        var data = row[targetColumn];

                        if(typeof data === 'string') {
                            data = data.toLowerCase();
                        }

                        if(data in localCacheData) {
                            localCacheData[data].push(i);
                        } else if(typeof data !== "undefined") {
                            localCacheData[data] = [i];
                        }
                    }
                }

                // Convert the duplicates into one-to-many map, looks like
                // alot of work but helps with processing the resulting data.
                for(var key in localCacheData) {
                    var duplicatedRows = localCacheData[key];

                    for(var counter = 0; counter < duplicatedRows.length; counter++) {
                        var currentRow = duplicatedRows[counter];
                        duplicates[currentRow] = [[], targetColumn + "=" + key];
                        for(var counter2 = 0; counter2 < duplicatedRows.length; counter2++) {
                            if(counter !== counter2) {
                                duplicates[currentRow][0].push(duplicatedRows[counter2]);
                            }
                        }

                        // If there are no duplicates with the row then just delete
                        // the row from the map since it is not considered a
                        // duplicate with anything else.
                        if(duplicates[currentRow][0].length === 0) {
                            delete duplicates[currentRow];
                        }
                    }
                }
            } else {
                var thisSetOfDuplicates = {};

                // Parse the existing duplicate list and do a comparison
                // of data of the row versus all the other potential duplicate rows.
                for(var currentRowNumber in duplicates) {
                    var currentDuplicatedRows = duplicates[currentRowNumber][0];
                    var data = cleanedDataArray[currentRowNumber][targetColumn];

                    thisSetOfDuplicates[currentRowNumber] = [[], duplicates[currentRowNumber][1] + "; " + targetColumn + "=" + data];

                    // compare current versus other potential duplicate date
                    for(var counter = 0; counter < currentDuplicatedRows.length; counter++) {
                        var otherRowNumber = currentDuplicatedRows[counter];

                        // if there's a match.. then add the duplicate row
                        if (data === cleanedDataArray[otherRowNumber][targetColumn]) {
                            thisSetOfDuplicates[currentRowNumber][0].push(otherRowNumber);
                        }
                    }

                    // If there are no duplicates with the row then just delete
                    // the row from the map since it is not considered a
                    // duplicate with anything else.
                    if(thisSetOfDuplicates[currentRowNumber][0].length === 0) {
                        delete thisSetOfDuplicates[currentRowNumber];
                    }
                }

                duplicates = thisSetOfDuplicates;
            }
        }

        // sort the tuples, the reason for this is because normally the
        // numbering on the items are normally updated when rows are removed
        // or added but this is complex for this type of duplicate detection
        // because you could have a 1 to many relationship that you need
        // to parse. e.g. Remove 1 row might end up modifying multiple messages.
        // To make things easier, the messages displayed do not reference
        // other row numbers but instead we group the duplicates in the same
        // location so that it is easier for the user to know which
        // rows have those duplicates.
        var tuples = [];
        for (var key in duplicates) tuples.push([key, duplicates[key]]);

        tuples.sort(function(a, b) {
            rowA = parseInt(a[0]);
            valueA = a[1][1];
            rowB = parseInt(b[0]);
            valueB = b[1][1];

            // sort in reverse order
            if(valueA < valueB) {
                return 1;
            }
            else if(valueA > valueB) {
                return -1;
            } else {
                if(rowA < rowB) {
                    return 1;
                } else if(rowA > rowB) {
                    return -1;
                }

                return 0;
            }
        });

        return tuples;
    };
}