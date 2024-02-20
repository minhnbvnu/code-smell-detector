function saveFileDetails(fileDetails){
    var obj = fileDetails;
    if (typeof file === 'string') {
        obj = {
            name: fileDetails,
            source: ''
        }
    }
    localStorageManager.setItem("oT-lastfile", JSON.stringify( obj ));
}