function countFn() {
                        setCount(editor,me);
                        domUtils.un(editor.document, "click", arguments.callee);
                    }