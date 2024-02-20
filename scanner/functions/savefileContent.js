function savefileContent(type) {
    var filepath = $('#filepath').text();
    if ("EditScriptManageEditorView" == type) {
        var filecontent = ScriptManageEditorView.getValue();
        socket.emit("savefileContent",{"filepath": filepath, "filecontent": filecontent});
        $('#ScriptManage').modal('hide');
    }else if ("EditCustomcode" == type) {
        var filename = $('#savefilename').val().trim();

        if (filename){
            var ScriptContent = Customcode.getValue();
            socket.emit("saveScript", { "ScriptContent": ScriptContent, "filename": filename});
        }else {
            alert("Invalid Input, filename not empty.")
        }
        $('#SaveScript').modal('hide');
    }
}