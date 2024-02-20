function initTextarea() {
            elmInputBox = $(domInput); //Get the text area target

            //If the text area is already configured, return
            if (elmInputBox.attr('data-mentions-input') === 'true') {
                return;
            }

            elmInputWrapper = elmInputBox.parent(); //Get the DOM element parent
            elmWrapperBox = $(settings.templates.wrapper());
            elmInputBox.wrapAll(elmWrapperBox); //Wrap all the text area into the div elmWrapperBox
            elmWrapperBox = elmInputWrapper.find('> div.mentions-input-box'); //Obtains the div elmWrapperBox that now contains the text area

            elmInputBox.attr('data-mentions-input', 'true'); //Sets the attribute data-mentions-input to true -> Defines if the text area is already configured
            elmInputBox.bind('keydown', onInputBoxKeyDown); //Bind the keydown event to the text area
            elmInputBox.bind('keypress', onInputBoxKeyPress); //Bind the keypress event to the text area
            elmInputBox.bind('click', onInputBoxClick); //Bind the click event to the text area
            elmInputBox.bind('blur', onInputBoxBlur); //Bind the blur event to the text area

            if (navigator.userAgent.indexOf("MSIE 8") > -1) {
                elmInputBox.bind('propertychange', onInputBoxInput); //IE8 won't fire the input event, so let's bind to the propertychange
            } else {
                elmInputBox.bind('input', onInputBoxInput); //Bind the input event to the text area
            }

            // Elastic textareas, grow automatically
            if( settings.elastic ) {
                elmInputBox.elastic();
            }
        }