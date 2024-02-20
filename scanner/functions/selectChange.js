function selectChange()
        {
            let numRows = selectNum.options[selectNum.selectedIndex].value;
            this.send(new model.SetNumRows(this.nodeId, Number(numRows)));
        }