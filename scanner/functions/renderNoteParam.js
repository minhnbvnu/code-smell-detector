function renderNoteParam(note,x,y){

        x += (font.charWidth*3) + 4;

        var id = "n" + note.instrument + "." + (displayVolume?note.volumeEffect:"") + "." + note.effect + "." + note.param + "." + font.charWidth;

        if (!noteParamCache[id]){
            //console.log("Caching note param " + id);

            var canvas = document.createElement("canvas");
            canvas.height = lineHeight;
            canvas.width = font.charWidth*7 + 10;
            var c = canvas.getContext("2d");

            var noteString = formatHex(note.instrument,2,"0");
            if (noteString == "00") noteString = "..";
            var nx=0;
            font.write(c,noteString,nx,0,0,"green");

            if (displayVolume){
                nx += (font.charWidth*2) + 4;
                var value = note.volumeEffect || 0;
                if (value) value -= 16;

				if (value<80){
					noteString = formatHex(value,2,"0");
                }else{
					var vuX = (value >> 4).toString(16).toUpperCase();
					var vuY = (value & 0x0f).toString(16).toUpperCase();

					var mapping = {
						"5" : "-",
						"6" : "+",
						"7" : "↓",
						"8" : "↑",
						"9" : "S",
						"A" : "V",
						"B" : "P",
						"C" : "<",
						"D" : ">",
						"E" : "M"
                    };
					vuX = mapping[vuX] || vuX;
					noteString = vuX + vuY;
				}

                if (!note.volumeEffect) noteString = "..";
                font.write(c,noteString,nx,0,0);
            }

            nx += (font.charWidth*2) + 4;

            if (note.effect>15){
                noteString = formatHexExtended(note.effect);
            }else{
                noteString = formatHex(note.effect);
            }

            noteString += formatHex(note.param,2,"0");
            if (noteString === "000") noteString = "...";
            font.write(c,noteString,nx,0,0,"orange");

            noteParamCache[id] = canvas;
        }

        me.ctx.drawImage(noteParamCache[id],x,y);

    }