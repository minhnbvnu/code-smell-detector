function formatDeprecationMessage(name, error, errorAfter, since, message) {
            let deprecationMessage = error ? "DeprecationError: " : "DeprecationWarning: ";
            deprecationMessage += `'${name}' `;
            deprecationMessage += since ? `has been deprecated since v${since}` : "is deprecated";
            deprecationMessage += error ? " and can no longer be used." : errorAfter ? ` and will no longer be usable after v${errorAfter}.` : ".";
            deprecationMessage += message ? ` ${formatStringFromArgs(message, [name], 0)}` : "";
            return deprecationMessage;
        }