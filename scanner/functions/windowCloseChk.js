function windowCloseChk() {
    if ((process.env.NODE_ENV !== "development") && win != null) {
        win.show();
        customDialog("select_on", "wnr", i18n.__('window-close-dialog-box-title'),
            "statisticsWriter();\n" +
            "multiScreenSolution(\"off\");\n" +
            "setTimeout(function () { app.exit(0); }, 500);");
    } else {
        statisticsWriter();
        multiScreenSolution("off");

        setTimeout(function () {
            app.exit(0);
        }, 500);
    }
}