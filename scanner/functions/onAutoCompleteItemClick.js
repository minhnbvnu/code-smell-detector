function onAutoCompleteItemClick(e) {
            var elmTarget = $(this); //Get the item selected
            var mention = autocompleteItemCollection[elmTarget.attr('data-uid')]; //Obtains the mention

            addMention(mention);
            scrollToInput();
            return false;
        }