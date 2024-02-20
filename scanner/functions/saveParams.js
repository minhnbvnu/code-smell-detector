function saveParams()
        {
            // Validate the new parameters
            try
            {
                model.validateParams(this.nodeType, newParams);
            }
            catch (e)
            {
                // If model updates fail, we don't close the dialog
                dialog.showError(e.message);
                console.log(e);
                return;
            }

            this.send(new model.SetNodeName(
                this.nodeId,
                newName
            ));

            // For each parameter
            for (let param of this.schema.params)
            {
                if (newParams[param.name] == nodeState.params[param.name])
                    continue;

                this.send(new model.SetParam(
                    this.nodeId,
                    param.name,
                    newParams[param.name]
                ));
            }

            dialog.close();
        }