function ReactDOMServerRenderer2(children, makeStaticMarkup, options) {
              var flatChildren = flattenTopLevelChildren(children);
              var topFrame = {
                type: null,
                domNamespace: Namespaces.html,
                children: flatChildren,
                childIndex: 0,
                context: emptyObject,
                footer: ""
              };
              {
                topFrame.debugElementStack = [];
              }
              this.threadID = allocThreadID();
              this.stack = [topFrame];
              this.exhausted = false;
              this.currentSelectValue = null;
              this.previousWasTextNode = false;
              this.makeStaticMarkup = makeStaticMarkup;
              this.suspenseDepth = 0;
              this.contextIndex = -1;
              this.contextStack = [];
              this.contextValueStack = [];
              this.uniqueID = 0;
              this.identifierPrefix = options && options.identifierPrefix || "";
              {
                this.contextProviderStack = [];
              }
            }