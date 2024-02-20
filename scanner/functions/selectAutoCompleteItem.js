function selectAutoCompleteItem(elmItem) {
            elmItem.addClass(settings.classes.autoCompleteItemActive); //Add the class active to item
            elmItem.siblings().removeClass(settings.classes.autoCompleteItemActive); //Gets all li elements in autocomplete list and remove the class active

            elmActiveAutoCompleteItem = elmItem; //Sets the item to elmActiveAutoCompleteItem
        }