function verifyGroupAlignment(properties) {
                const length = properties.length, widths = properties.map(getKeyWidth), // Width of keys, including quotes
                align = alignmentOptions.on; // "value" or "colon"
                let targetWidth = Math.max(...widths), beforeColon, afterColon, mode;
                if (alignmentOptions && length > 1) { // When aligning values within a group, use the alignment configuration.
                    beforeColon = alignmentOptions.beforeColon;
                    afterColon = alignmentOptions.afterColon;
                    mode = alignmentOptions.mode;
                }
                else {
                    beforeColon = multiLineOptions.beforeColon;
                    afterColon = multiLineOptions.afterColon;
                    mode = alignmentOptions.mode;
                }
                // Conditionally include one space before or after colon
                targetWidth += (align === "colon" ? beforeColon : afterColon);
                for (let i = 0; i < length; i++) {
                    const property = properties[i];
                    const whitespace = getPropertyWhitespace(property);
                    if (whitespace) { // Object literal getters/setters lack a colon
                        const width = widths[i];
                        if (align === "value") {
                            report(property, "key", whitespace.beforeColon, beforeColon, mode);
                            report(property, "value", whitespace.afterColon, targetWidth - width, mode);
                        }
                        else { // align = "colon"
                            report(property, "key", whitespace.beforeColon, targetWidth - width, mode);
                            report(property, "value", whitespace.afterColon, afterColon, mode);
                        }
                    }
                }
            }