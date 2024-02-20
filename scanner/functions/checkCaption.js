function checkCaption(exportButton) {
                var $caption = $el.find('caption:not(.head)');
                $caption.length ? $caption.append(exportButton) : $el.prepend('<caption class="' + bootstrapSpacing + settings.position + '">' + exportButton + '</caption>');
            }