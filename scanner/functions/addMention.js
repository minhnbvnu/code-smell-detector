function addMention(mention) {

            var currentMessage = getInputBoxValue(),
                caretStart = elmInputBox[0].selectionStart,
                shortestDistance = false,
                bestLastIndex = false;

            // Using a regex to figure out positions
            var regex = new RegExp("\\" + settings.triggerChar + currentDataQuery, "gi"),
                regexMatch;

            while(regexMatch = regex.exec(currentMessage)) {
                if (shortestDistance === false || Math.abs(regex.lastIndex - caretStart) < shortestDistance) {
                    shortestDistance = Math.abs(regex.lastIndex - caretStart);
                    bestLastIndex = regex.lastIndex;
                }
            }

            var startCaretPosition = bestLastIndex - currentDataQuery.length - 1; //Set the start caret position (right before the @)
            var currentCaretPosition = bestLastIndex; //Set the current caret position (right after the end of the "mention")


            var start = currentMessage.substr(0, startCaretPosition);
            var end = currentMessage.substr(currentCaretPosition, currentMessage.length);
            var startEndIndex = (start + mention.value).length + 1;

            // See if there's the same mention in the list
            if( !_.find(mentionsCollection, function (object) { return object.id == mention.id; }) ) {
                mentionsCollection.push(mention);//Add the mention to mentionsColletions
            }

            // Cleaning before inserting the value, otherwise auto-complete would be triggered with "old" inputbuffer
            resetBuffer();
            currentDataQuery = '';
            hideAutoComplete();

            // Mentions and syntax message
            var updatedMessageText = start + mention.value + ' ' + end;
            elmInputBox.val(updatedMessageText); //Set the value to the txt area
	        elmInputBox.trigger('mention');
            updateValues();

            // Set correct focus and selection
            elmInputBox.focus();
            utils.setCaratPosition(elmInputBox[0], startEndIndex);
        }