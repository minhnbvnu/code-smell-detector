function queryButtonText(options) {
            var buttonText = options.buttonText || {};
            return buttonText[requestedViewType] ||
                // view can decide to look up a certain key
                (spec.buttonTextKey ? buttonText[spec.buttonTextKey] : null) ||
                // a key like "month"
                (spec.singleUnit ? buttonText[spec.singleUnit] : null);
        }