function oninput(evt)
        {
            this.send(new model.SetParam(
                this.nodeId,
                'text',
                textArea.value.trimEnd()
            ));
        }