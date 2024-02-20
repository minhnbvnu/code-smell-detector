function addGuiSeparator() {
    if (userGui && !guiSeparatorAdded) {
        guiSeparatorAdded = true;
        gui.addSeparator();
    }
}