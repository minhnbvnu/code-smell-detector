function markRestricted($helper, flag) {
                if (flag) {
                    $helper.addClass(restrictedCssClass);
                } else {
                    $helper.removeClass(restrictedCssClass);
                }
            }