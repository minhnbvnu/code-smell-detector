function disable_mmenu_buttons() {
    // This function is generallly used to disable open/close buttons until
    // the menu is fully open or fully closed. An issue exists where if
    // both are opened/closed while another menu is opening or closing then
    // the menus will permanently appear BEHIND the page contents.

    $('.search-menu-icon').off()
    $('.nav-menu-icon').off()
}