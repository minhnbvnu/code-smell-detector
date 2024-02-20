function reactToInput(){
    let input = this;
    var file = input.files[0];
    
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e) { 
        var contents = e.target.result;
        loadFile( contents );
    }
    
    input.value = '';
    
    
}