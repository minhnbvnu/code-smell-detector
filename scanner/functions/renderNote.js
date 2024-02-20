function renderNote(note,x,y){

        if (Tracker.inFTMode()){
            var id = "i" + note.index + "." + font.charWidth;
        }else{
            id = "p" + note.period + "." + font.charWidth;
        }

        if (!noteCache[id]){

            //console.log("Caching note " + id);

            var canvas = document.createElement("canvas");
            canvas.height = lineHeight;
            canvas.width = font.charWidth*3 + 2;
            var c = canvas.getContext("2d");

            if (Tracker.inFTMode()){
                if (note.index){
                    var ftNote = FTNotes[note.index];
                    if (note.index === 97) ftNote = FTNotes[NOTEOFF];

                    var noteString = ftNote ? ftNote.name : "???"
                }else{
                    noteString = "---";
                    var baseNote = FTPeriods[note.period];
                    if (baseNote){
                        ftNote = FTNotes[baseNote];
                        if (ftNote) noteString = ftNote.name;
                    }else{
                        if (note.period>0) console.error("no basenote for " + note.period)
                    }
                }
            }else{
                baseNote = periodNoteTable[note.period];
                noteString = baseNote ? baseNote.name : "---";
            }

            font.write(c,noteString,0,0,0);

            noteCache[id] = canvas;

        }

        me.ctx.drawImage(noteCache[id],x,y);

    }