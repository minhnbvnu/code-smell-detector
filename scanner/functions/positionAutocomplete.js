function positionAutocomplete(elmAutocompleteList, elmInputBox) {
            var elmAutocompleteListPosition = elmAutocompleteList.css('position');
            if (elmAutocompleteListPosition == 'absolute') {
                var position = textareaSelectionPosition(elmInputBox),
                    lineHeight = parseInt(elmInputBox.css('line-height'), 10) || 18;
                elmAutocompleteList.css('width', '15em'); // Sort of a guess
                elmAutocompleteList.css('left', position.left);
                elmAutocompleteList.css('top', lineHeight + position.top);

                //check if the right position of auto complete is larger than the right position of the input
                //if yes, reset the left of auto complete list to make it fit the input
                var elmInputBoxRight = elmInputBox.offset().left + elmInputBox.width(),
                    elmAutocompleteListRight = elmAutocompleteList.offset().left + elmAutocompleteList.width();
                if (elmInputBoxRight <= elmAutocompleteListRight) {
                    elmAutocompleteList.css('left', Math.abs(elmAutocompleteList.position().left - (elmAutocompleteListRight - elmInputBoxRight)));
                }
            }
            else if (elmAutocompleteListPosition == 'fixed') {
                var offset = textareaSelectionOffset(elmInputBox),
                    lineHeight = parseInt(elmInputBox.css('line-height'), 10) || 18;
                elmAutocompleteList.css('width', '15em'); // Sort of a guess
                elmAutocompleteList.css('left', offset.left + 10000);
                elmAutocompleteList.css('top', lineHeight + offset.top);
            }
        }