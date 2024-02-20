function expandFolderDefault(parentNode) {
				if (fullexpandedFolder !== null) {
					if(!parentNode) {
						parentNode = tree_model.rootNode;
					}

					// looking for node that starts with specified path
					var node = tree_model.findByFilter(function (node) {
						return (fullexpandedFolder.indexOf(node.id) === 0);
					}, parentNode);

					if (node) {
                        config.filetree.expandSpeed = 10;
                        tree_model.loadDataNode(node, false, true);
					} else {
						fullexpandedFolder = null;
                        config.filetree.expandSpeed = 200;
                        tree_model.setItemsFromNode(parentNode);
					}
				}
			}