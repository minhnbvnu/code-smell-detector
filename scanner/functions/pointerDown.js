function pointerDown(evt)
        {
            // Ignore right clicks
            if (evt.button != 0)
                return;

            evt.stopPropagation();

            console.log('pointerdown on node');

            // Can't drag a node while connecting a port
            if (this.editor.edge)
            {
                return;
            }

            let mousePos = this.editor.getMousePos(evt);
            this.editor.startDrag(this.nodeId, mousePos);

            this.nodeDiv.setPointerCapture(evt.pointerId);
        }