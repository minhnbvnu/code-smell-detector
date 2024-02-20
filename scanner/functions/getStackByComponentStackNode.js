function getStackByComponentStackNode(componentStack) {
              try {
                var info = "";
                var node = componentStack;
                do {
                  switch (node.tag) {
                    case 0:
                      info += describeBuiltInComponentFrame(node.type, null, null);
                      break;
                    case 1:
                      info += describeFunctionComponentFrame(node.type, null, null);
                      break;
                    case 2:
                      info += describeClassComponentFrame(node.type, null, null);
                      break;
                  }
                  node = node.parent;
                } while (node);
                return info;
              } catch (x) {
                return "\nError generating stack: " + x.message + "\n" + x.stack;
              }
            }