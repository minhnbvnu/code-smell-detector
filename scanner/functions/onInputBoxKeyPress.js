function onInputBoxKeyPress(e) {
            if(e.keyCode !== KEY.BACKSPACE) { //If the key pressed is not the backspace
                var typedValue = String.fromCharCode(e.which || e.keyCode); //Takes the string that represent this CharCode
                inputBuffer.push(typedValue); //Push the value pressed into inputBuffer
            }
        }