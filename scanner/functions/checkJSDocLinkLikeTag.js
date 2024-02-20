function checkJSDocLinkLikeTag(node) {
                if (node.name) {
                    resolveJSDocMemberName(node.name, 
                    /*ignoreErrors*/
                    true);
                }
            }