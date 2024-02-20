function updateCursor() {
            var head = sel.inverted ? sel.from : sel.to, lh = textHeight();
            var pos = localCoords(head, true);
            var wrapOff = eltOffset(wrapper), lineOff = eltOffset(lineDiv);
            inputDiv.style.top = (pos.y + lineOff.top - wrapOff.top) + "px";
            inputDiv.style.left = (pos.x + lineOff.left - wrapOff.left) + "px";
            if (posEq(sel.from, sel.to)) {
                cursor.style.top = pos.y + "px";
                cursor.style.left = (options.lineWrapping ? Math.min(pos.x, lineSpace.offsetWidth) : pos.x) + "px";
                cursor.style.display = "";
            }
            else cursor.style.display = "none";
        }