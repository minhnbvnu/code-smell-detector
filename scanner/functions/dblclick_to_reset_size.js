function dblclick_to_reset_size (img) {
        /**
         * Double-click on an image toggles confinement to notebook width
         *
         * img: jQuery element
         */

        img.dblclick(function () {
            // dblclick toggles *raw* size, disabling max-width confinement.
            if (img.hasClass('unconfined')) {
                img.removeClass('unconfined');
            } else {
                img.addClass('unconfined');
            }
        });
    }