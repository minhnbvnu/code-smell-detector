function pointerUp(evt)
        {
            evt.stopPropagation();

            let mousePos = this.editor.getMousePos(evt);
            this.editor.endDrag(mousePos);

            this.nodeDiv.releasePointerCapture(evt.pointerId);
        }