function isInDark() {
    if (store.get("dark-or-white") === 0) {
        isDarkMode = styleCache.get('isdark');
    } else {
        isDarkMode = store.get("dark-or-white") === 2;
    }
    if (isDarkMode) {
        $('.whitemode-jetplane').remove();
        $('body').append(
            '<style class="darkmode-jetplane">' +
            '::-webkit-scrollbar-track {background-color: #191919;} ' +
            '::-webkit-scrollbar-thumb {background-color: #999999;} ' +
            '.dropdown-menu {border-color: #aaaaaa; background-color: #393939;} ' +
            '.dropdown-item:hover {background-color: #555555; color: #fefefe;} ' +
            'input[type="range"] {background-color: #aaaaaa33;} ' +
            'body {background-color: #191919;} ' +
            'hr {border-color: #666666;} ' +
            '#title, h1, h3 {color: #bbbbbb;} ' +
            '#settings-title, #predefined-tasks-sidebar, #settings-sidebar, #about-content {border-color: #aaaaaa33;} .settings-sidebar-block {color: #fefefe; background-color: #191919;} ' +
            '#loader-wrapper .loader-section {background: #191919;} ' +
            '.dropdown-item, .dropdown-item .text-info, label, li, select, #personalization input[type="text"], input[type="password"], #settings-container input[type="number"], input[type="time"], .settings-sidebar-block {color: #bbbbbb !important;} ' +
            '#settings-container input[type="text"], #settings-container input[type="number"], #settings-container input[type="password"], #settings-container input[type="text"], #extend-form input, #settings-container .dropdown .btn, #dropdown-menu-button {border-bottom-color: #cccccc23 !important; color: #aaaaaa;} ' +
            '.work {color: #ea5454 !important;} ' +
            '.rest {color: #5490ea !important;}' +
            '.text-info {color: #17a2b8 !important;} ' +
            'input[type="text"]:focus, input[type="number"]:focus, input[type="password"]:focus, #settings-container input[type="text"]:focus, #settings-container input[type="number"]:focus, #settings-container .dropdown .btn:focus, #dropdown-menu-button:focus {border-bottom-color: #cccccc33 !important;} ' +
            'input[type="text"]:hover, input[type="number"]:hover, input[type="password"]:hover, #settings-container input[type="text"]:hover, #settings-container input[type="number"]:hover, #settings-container .dropdown .btn:hover, #dropdown-menu-button:hover {border-bottom-color: #cccccc28 !important;} ' +
            '.hotkey-setting {color: #aaaaaa;} ' +
            'html {border: #ffffff33 1px solid;} ' +
            '.switch-slide-label {background: #333;} ' +
            '.switch-slide-label:after {background: #ccc !important;}' +
            '.card {background-color: #191919; border: 1px solid rgba(255,255,255,.125);} ' +
            '.settings-title {color: #ddd; text-transform: uppercase;}' +
            '#dialog-msg {color: #ccc;}' +
            '.dropdown-default {color: #aaa;}' +
            '.dropdown-toggle::before {color: #aaa;}' +
            '</style>'
        );
    } else {
        $('.darkmode-jetplane').remove();
        $('body').append('<style class="whitemode-jetplane">body {background-color: #fefefe;}</style>');
    }
}