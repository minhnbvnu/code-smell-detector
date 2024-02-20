function showAboutDialog(window) {
    const builder = Gtk.Builder.new_from_resource(ABOUT_RESOURCE);
    const dialog = builder.get_object('about-window');
    dialog.transient_for = window;
    dialog.present();
}