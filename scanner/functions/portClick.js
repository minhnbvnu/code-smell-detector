function portClick(action)
        {
            let [cx, cy] = this.getPortPos(portIdx, side);

            // If no connection is in progress
            if (!editor.edge)
            {
                // New connections can only be started on pointer down
                if (action == 'up')
                {
                    return;
                }

                let edge = new Edge();

                // If this is an input port, remove previous connection
                if (side == 'dst')
                {
                    // Remove previous connection on this port, if any
                    editor.model.update(new model.Disconnect(
                        this.nodeId,
                        portIdx,
                    ));

                    edge.setDst(this, portIdx, cx, cy);
                }
                else
                {
                    edge.setSrc(this, portIdx, cx, cy);
                }

                editor.edge = edge;
                editor.svg.appendChild(edge.line);

                return;
            }

            // Must connect in port to out port
            if (editor.edge.openSide != side)
            {
                return;
            }

            let connectAction = this.generateConnectAction(side, portIdx);

            if (editor.model.detectCycles(connectAction)) {
                errorDialog('This connection would create a cycle in the node graph.');
                return;
            }

            editor.model.update(connectAction);

            // Done connecting
            editor.edge = null;
        }