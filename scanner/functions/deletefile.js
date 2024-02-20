function deletefile(count){
    if (count == '1'){
        $('#ScriptManage').modal('hide');
        $('#deleteScript').modal('show');
    }else if(count == '2'){
        var filepath = $('#deletefilename').text().toString().trim();

        if (filepath){
            // console.log(filepath);
            socket.emit("deletefile",{"filepath": filepath});
        }else{
            alert("Delete failed, Please select the file you want to delete.")
        }
        $('#deleteScript').modal('hide');
    }
}