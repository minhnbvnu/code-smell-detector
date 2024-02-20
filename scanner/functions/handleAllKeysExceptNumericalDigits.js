function handleAllKeysExceptNumericalDigits(key, e) {
                    // -(minus) key
                    if (key === 45) {
                        $input.val(changeSign());
                        return false;
                        // +(plus) key
                    } else if (key === 43) {
                        $input.val($input.val().replace("-", ""));
                        return false;
                        // enter key or tab key
                    } else if (key === 13 || key === 9) {
                        return true;
                    } else if ($.browser.mozilla && (key === 37 || key === 39) && e.charCode === 0) {
                        // needed for left arrow key or right arrow key with firefox
                        // the charCode part is to avoid allowing "%"(e.charCode 0, e.keyCode 37)
                        return true;
                    } else { // any other key with keycode less than 48 and greater than 57
                        preventDefault(e);
                        return true;
                    }
                }