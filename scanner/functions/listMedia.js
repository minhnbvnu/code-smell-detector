function listMedia(Entries){
    for(var i=0; i<Entries.length; i++){
        if(!searching){
            break;
        }
        if(Entries[i].isFile){
            var ext = Entries[i].name.substr(Entries[i].name.lastIndexOf('.') + 1).toLowerCase();
            var type = (imgFormats.indexOf(ext)>=0?'image':(vidFormats.indexOf(ext)>=0?'video':(audFormats.indexOf(ext)>=0?'music':null)));
            if(!type){
                continue;
            }
            var item = document.createElement('span');
            item.className = 'item';
            item.title = Entries[i].name;
            item.onclick = (function(Entry){
                
            })(Entries[i]);
            document.getElementById('container').appendChild(item);
            var icon = document.createElement('span');
            icon.className = 'icon';
            icon.innerHTML = (type=='image'?'&#xf0137;':(type=='video'?'&#xf0162;':'&#xf0036;'));
            item.appendChild(icon);
            var text = document.createElement('span');
            text.className = 'text';
            text.innerHTML = Entries[i].name;
            item.appendChild(text);
        }
        else if(Entries[i].isDirectory){
            var dirReader = Entries[i].createReader();
            dirReader.readEntries(listMedia);
        }
    }
}