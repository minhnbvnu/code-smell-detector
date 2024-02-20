function factorChange()
        {
            let factor = Number(select.options[select.selectedIndex].value);

            this.send(new model.SetParam(
                this.nodeId,
                'factor',
                factor
            ));
        }