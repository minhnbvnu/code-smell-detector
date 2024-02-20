function setFromTextInput() {

            var value = textInput.val();

            if ((value === null || value === "") && allowEmpty) {
                set(null);
            }
            else {
                var tiny = tinycolor(value);
                if (tiny.ok) {
                    set(tiny);
                }
                else {
                    textInput.addClass("sp-validation-error");
                }
            }
        }