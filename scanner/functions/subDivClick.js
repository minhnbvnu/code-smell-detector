function subDivClick(evt)
            {
                dialog.close();
                evt.stopPropagation();

                this.model.update(new model.CreateNode(
                    nodeType,
                    mousePos.x,
                    mousePos.y
                ));
            }