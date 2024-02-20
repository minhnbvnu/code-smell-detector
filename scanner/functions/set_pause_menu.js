function set_pause_menu(...options) {
    if (options.length > 3) { $error("At most three custom menu options are supported."); }
    for (let i = 0; i < options.length; ++i) {
        if (options[i].text === undefined) {
            $error('set_pause_menu() options must be objects with text properties');
        }
    }
    $customPauseMenuOptions = clone(options);
}