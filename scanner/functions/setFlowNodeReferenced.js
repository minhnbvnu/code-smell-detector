function setFlowNodeReferenced(flow) {
                flow.flags |= flow.flags & 2048 /* Referenced */ ? 4096 /* Shared */ : 2048 /* Referenced */;
            }