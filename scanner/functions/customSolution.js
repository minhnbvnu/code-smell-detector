function customSolution(type, parent) {
    parent.append(domString(type));
    switch (type) {//after-append
        case "autocheck":
            autoCheckInitializer();
            break;
        case "predefined":
            predefinedInitializer();
            break;
        case "task-reservation":
            reservedInitializer();
            break;
        case "personalization-notify-sound":
            personalizationSoundInitializer();
            break;
        case "i18n":
            languageInitializer();
            break;
        case "hotkey":
            hotkeyInitializer();
            break;
        case "locker":
            lockerInitializer();
            break;
        case "theme-color":
            colorInitializer();
            break;
    }
}