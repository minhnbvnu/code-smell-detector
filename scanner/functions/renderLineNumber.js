function renderLineNumber(nr,x,y){

        var ti = "" + nr;
        if (nr<10) ti = "0" + ti;
        var id = ti + "." + font.charWidth;

        if (!lineNumberCache[id]){
            var canvas = document.createElement("canvas");
            canvas.height = lineHeight;
            canvas.width = font.charWidth*3;
            var c = canvas.getContext("2d");

            var color = false;
            if (nr%4 === 0) color = "orange";

            font.write(c,ti,0,0,0,color);
            lineNumberCache[id] = canvas;
        }

        me.ctx.drawImage(lineNumberCache[id],x,y);

    }