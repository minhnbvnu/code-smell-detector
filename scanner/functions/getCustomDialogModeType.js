function getCustomDialogModeType(mode) {
    switch (mode) {
        case "on":
            return 0;
        case "select_on":
            return 1;
        case "update_on":
            return 2;
    }
}