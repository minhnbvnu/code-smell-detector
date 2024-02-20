function processJSDocTemplateTag(tag) {
                for (const child of tag.getChildren()) {
                    processElement(child);
                }
            }