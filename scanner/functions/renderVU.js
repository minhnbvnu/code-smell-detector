function renderVU(note,x,y,track,index){
        if (Tracker.isPlaying() && note && note.period && trackVUHistory[track]!==index){
            var vu = 100;
            if (note.effect === 12){
                vu = note.param * 100/64;
            }else{
                var instrument = Tracker.getInstrument(note.instrument);
                if (instrument) vu = instrument.sample.volume * 100/64;
            }
            trackVULevel[track] = vu;
            trackVUHistory[track]=index;
        }

        if (trackVULevel[track]){
            hasVU = true;
            var vuHeight = trackVULevel[track] * trackVULevelMax / 100;
            var sHeight = vuHeight * 100 / trackVULevelMax;

            if (SETTINGS.vubars === "colour"){
                var bar = Y.getImage("vubar");
                me.ctx.drawImage(bar,0,100-sHeight,26,sHeight,x,y-vuHeight,10,vuHeight);
            }else if (SETTINGS.vubars === "trans"){
                me.ctx.fillStyle = "rgba(120,190,255,0.3)";
                me.ctx.fillRect(x,y-vuHeight,10,vuHeight);
            }

            trackVULevel[track] -= trackVULevelDecay;
            if (trackVULevel[track]<0){
                trackVULevel[track]=0;
            }
        }

    }