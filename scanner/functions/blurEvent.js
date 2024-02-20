function blurEvent(e) {
                    if ($.browser.msie) {
                        keypressEvent(e);
                    }

                    if (!!settings.formatOnBlur && $input.val() !== onFocusValue) {
                        applyMask(e);
                    }

                    if ($input.val() === "" && settings.allowEmpty) {
                        $input.val("");
                    } else if ($input.val() === "" || $input.val() === setSymbol(getDefaultMask(), settings)) {
                        if (!settings.allowZero) {
                            $input.val("");
                        } else if (!settings.affixesStay) {
                            $input.val(getDefaultMask());
                        } else {
                            $input.val(setSymbol(getDefaultMask(), settings));
                        }
                    } else {
                        if (!settings.affixesStay) {
                            var newValue = $input.val().replace(settings.prefix, "").replace(settings.suffix, "");
                            $input.val(newValue);
                        }
                    }
                    if ($input.val() !== onFocusValue) {
                        $input.change();
                    }
                }