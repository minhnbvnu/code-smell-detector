function on_click_closure(name) {
        return function (_event) {
            return fig.toolbar_button_onclick(name);
        };
    }