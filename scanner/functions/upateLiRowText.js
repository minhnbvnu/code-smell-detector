function upateLiRowText(selector, index, amount, actionType) {
    selector.filter(function() {
        var row = $(this).data('row');

        if(row !== 'undefined') {
            if(actionType === "insert") {
                return row >= index;
            } else {
                return row > index;
            }
        }

        return false;
    }).each(function() {
        var row = $(this).data('row');
        var offsetAmount = amount;

        if(actionType === "insert") {
            offsetAmount = -amount;
        }

        $(this).data('row', row - offsetAmount);

        var text = $(this).html();
        var rowVariant1 = "At (";
        var rowVariant2 = "At row ";

        if(text.substring(0, rowVariant1.length) === rowVariant1) {
            var numberPattern = /At\ \((\d+)/;
            var replacementText = rowVariant1 + (row - offsetAmount + 1);
            var replacedText = text.replace(numberPattern, replacementText);
            $(this).html(replacedText);
        } else if(text.substring(0, rowVariant2.length) === rowVariant2) {
            var numberPattern = /At\ row\ (\d+)/;
            var replacementText = rowVariant2 + (row - offsetAmount + 1);
            var replacedText = text.replace(numberPattern, replacementText);
            $(this).html(replacedText);

/*            var localDuplicatePattern = /Locally\ duplicate\ rows\ (.*?)\ /;

            var localDuplicateResult = localDuplicatePattern.exec(text)
            if(localDuplicateResult.length > 1) {
                var otherDuplicateRows = JSON.parse(localDuplicateResult[1]);

                if(otherDuplicateRows.length === 1) {

                }
            }

            var replacedText2 = text.replace(localDuplicatePattern, replacementText);*/
        }
    });
}