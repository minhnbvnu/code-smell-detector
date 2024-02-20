function on_mouseover_closure(tooltip) {
        return function (event) {
            if (!event.currentTarget.disabled) {
                return fig.toolbar_button_onmouseover(tooltip);
            }
        };
    }