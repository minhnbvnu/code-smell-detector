function renderChildrenArray(request, task, children) {
              var totalChildren = children.length;
              for (var i = 0; i < totalChildren; i++) {
                var prevTreeContext = task.treeContext;
                task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
                try {
                  renderNode(request, task, children[i]);
                } finally {
                  task.treeContext = prevTreeContext;
                }
              }
            }