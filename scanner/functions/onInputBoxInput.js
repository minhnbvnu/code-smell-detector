function onInputBoxInput(e) {
            updateValues();
            updateMentionsCollection();

            var triggerCharIndex = _.lastIndexOf(inputBuffer, settings.triggerChar); //Returns the last match of the triggerChar in the inputBuffer
            if (triggerCharIndex > -1) { //If the triggerChar is present in the inputBuffer array
                currentDataQuery = inputBuffer.slice(triggerCharIndex + 1).join(''); //Gets the currentDataQuery
                currentDataQuery = utils.rtrim(currentDataQuery); //Deletes the whitespaces
                _.defer(_.bind(doSearch, this, currentDataQuery)); //Invoking the function doSearch ( Bind the function to this)
            }
        }