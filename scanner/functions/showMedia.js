function showMedia(Entry, path){
    document.getElementById('container').innerHTML = '';
    document.getElementById('subpath').innerHTML = '<span class="name">'+path+'</span><span class="pointer">»</span>';
    var dirReader = Entry.createReader();
    dirReader.readEntries(listMedia);
}