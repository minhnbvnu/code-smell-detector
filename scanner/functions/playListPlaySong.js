function playListPlaySong(index){
        var item = playlist[index];
        if (item){
            listbox.setSelectedIndex(index);
            playListIndex = index;
            playlistActive = true;
            Tracker.autoPlay = true;
            Tracker.load(item.url);
        }
    }