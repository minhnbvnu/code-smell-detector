function setTrackControlsLayout(){

        // controlBar
        var startTrack = patternView.getStartTrack();
        var endTrack = Math.min(startTrack + Layout.visibleTracks,Tracker.getTrackCount());

        var isVisible = !(Layout.expandSampleViewHeight && currentView === "sample");

        for (i = 0;i< trackControls.length;i++){

            if ( i>=startTrack && i<endTrack){
                trackControls[i].setProperties({
                    track:i,
                    left: patternTrackLeft + (Layout.trackWidth+Layout.trackMargin)* (i-startTrack),
                    top: Layout.defaultMargin + Layout.infoPanelHeight + Layout.analyserHeight,
                    width: Layout.trackWidth,
                    height:Layout.trackControlHeight,
                    visible: isVisible
                });
            }else{
                trackControls[i].setProperties({
                    track:i,
                    top: -100,
                    visible: false
                });
            }

        }
    }