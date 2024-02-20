function maskAndPosition(startPos) {
                    var originalLen = $input.val().length,
                        newLen;
                    $input.val(maskValue($input.val(), settings));
                    newLen = $input.val().length;
                    // If the we're using the reverse option,
                    // do not put the cursor at the end of
                    // the input. The reverse option allows
                    // the user to input text from left to right.
                    if (!settings.reverse) {
                        startPos = startPos - (originalLen - newLen);
                    }
                    setCursorPosition(startPos);
                }