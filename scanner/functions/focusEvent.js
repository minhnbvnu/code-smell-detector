function focusEvent() {
                    onFocusValue = $input.val();
                    mask();
                    var input = $input.get(0),
                        textRange;

                    if (!!settings.selectAllOnFocus) {
                        input.select();
                    } else if (input.createTextRange && settings.bringCaretAtEndOnFocus) {
                        textRange = input.createTextRange();
                        textRange.collapse(false); // set the cursor at the end of the input
                        textRange.select();
                    }
                }