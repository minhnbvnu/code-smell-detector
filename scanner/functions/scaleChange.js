function scaleChange()
        {
            let scaleRoot = selectRoot.options[selectRoot.selectedIndex].value;
            let scaleName = selectScale.options[selectScale.selectedIndex].value;
            let numOctaves = selectNum.options[selectNum.selectedIndex].value;

            this.send(new model.SetScale(
                this.nodeId,
                scaleRoot,
                scaleName,
                Number(numOctaves)
            ));
        }