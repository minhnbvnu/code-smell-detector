function updateMentionsCollection() {
            var inputText = getInputBoxValue(); //Get the actual value of text area

	        //Returns the values that doesn't match the condition
            mentionsCollection = _.reject(mentionsCollection, function (mention, index) {
                return !mention.value || inputText.indexOf(mention.value) == -1;
            });
            mentionsCollection = _.compact(mentionsCollection); //Delete all the falsy values of the array and return the new array
        }