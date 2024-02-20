function KeepTool() {
    this.launch = function () {
        launch("com.google.android.keep");
    };

    this.importText = function (note) {
        id("com.google.android.keep:id/new_note_button").findOne(6000).click();
        
        setText(1, note.content);
        setText(0, note.title);
        
        back();
        back();
    };
}