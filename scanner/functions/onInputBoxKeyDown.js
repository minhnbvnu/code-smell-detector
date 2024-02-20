function onInputBoxKeyDown(e) {

            // This also matches HOME/END on OSX which is CMD+LEFT, CMD+RIGHT
            if (e.keyCode === KEY.LEFT || e.keyCode === KEY.RIGHT || e.keyCode === KEY.HOME || e.keyCode === KEY.END) {
                // Defer execution to ensure carat pos has changed after HOME/END keys then call the resetBuffer function
                _.defer(resetBuffer);

                // IE9 doesn't fire the oninput event when backspace or delete is pressed. This causes the highlighting
                // to stay on the screen whenever backspace is pressed after a highlighed word. This is simply a hack
                // to force updateValues() to fire when backspace/delete is pressed in IE9.
                if (navigator.userAgent.indexOf("MSIE 9") > -1) {
                  _.defer(updateValues); //Call the updateValues function
                }

                return;
            }

            //If the key pressed was the backspace
            if (e.keyCode === KEY.BACKSPACE) {
                inputBuffer = inputBuffer.slice(0, -1 + inputBuffer.length); // Can't use splice, not available in IE
                return;
            }

            //If the elmAutocompleteList is hidden
            if (!elmAutocompleteList.is(':visible')) {
                return true;
            }

            switch (e.keyCode) {
                case KEY.UP: //If the key pressed was UP or DOWN
                case KEY.DOWN:
                    var elmCurrentAutoCompleteItem = null;
                    if (e.keyCode === KEY.DOWN) { //If the key pressed was DOWN
                        if (elmActiveAutoCompleteItem && elmActiveAutoCompleteItem.length) { //If elmActiveAutoCompleteItem exits
                            elmCurrentAutoCompleteItem = elmActiveAutoCompleteItem.next(); //Gets the next li element in the list
                        } else {
                            elmCurrentAutoCompleteItem = elmAutocompleteList.find('li').first(); //Gets the first li element found
                        }
                    } else {
                        elmCurrentAutoCompleteItem = $(elmActiveAutoCompleteItem).prev(); //The key pressed was UP and gets the previous li element
                    }
                    if (elmCurrentAutoCompleteItem.length) {
                        selectAutoCompleteItem(elmCurrentAutoCompleteItem);
                    }
                    return false;
                case KEY.RETURN: //If the key pressed was RETURN or TAB
                case KEY.TAB:
                    if (elmActiveAutoCompleteItem && elmActiveAutoCompleteItem.length) { //If the elmActiveAutoCompleteItem exists
                        elmActiveAutoCompleteItem.trigger('mousedown'); //Calls the mousedown event
                        return false;
                    }
                break;
            }

            return true;
        }