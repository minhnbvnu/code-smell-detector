function on_mouse_event_closure(name) {
        /* User Agent sniffing is bad, but WebKit is busted:
         * https://bugs.webkit.org/show_bug.cgi?id=144526
         * https://bugs.webkit.org/show_bug.cgi?id=181818
         * The worst that happens here is that they get an extra browser
         * selection when dragging, if this check fails to catch them.
         */
        var UA = navigator.userAgent;
        var isWebKit = /AppleWebKit/.test(UA) && !/Chrome/.test(UA);
        if(isWebKit) {
            return function (event) {
                /* This prevents the web browser from automatically changing to
                 * the text insertion cursor when the button is pressed. We
                 * want to control all of the cursor setting manually through
                 * the 'cursor' event from matplotlib */
                event.preventDefault()
                return fig.mouse_event(event, name);
            };
        } else {
            return function (event) {
                return fig.mouse_event(event, name);
            };
        }
    }