function setScrollBarHorPosition(){

        var max = me.width;
        var width = Math.floor((max / Tracker.getTrackCount()) * visibleTracks);
        var step = (max - width) / (Tracker.getTrackCount()-visibleTracks);

        var top = me.height-20;
        if (visibleTracks>=Tracker.getTrackCount()) top = -200;

        scrollBarHor.setProperties({
            top: top,
            width: width,
            left: 0 + Math.floor((startTrack * step))
        });
    }