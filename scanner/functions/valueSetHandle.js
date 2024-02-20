function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
                // Ensure numeric input
                handleNumber = Number(handleNumber);
                if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
                    throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
                }
                // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
                // The exactInput argument can be used to ignore slider stepping (#436)
                setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
                fireEvent("update", handleNumber);
                if (fireSetEvent) {
                    fireEvent("set", handleNumber);
                }
            }