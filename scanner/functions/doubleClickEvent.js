function doubleClickEvent() {
                    var input = $input.get(0),
                        start,
                        length;
                    if (input.setSelectionRange && settings.bringCaretAtEndOnFocus) {
                        length = $input.val().length;
                        start = settings.doubleClickSelection ? 0 : length;
                        input.setSelectionRange(start, length);
                    } else {
                        $input.val($input.val());
                    }
                }