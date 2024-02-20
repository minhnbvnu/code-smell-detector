function OnRightClick(event, treeId, treeNode) {
	if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
		zTree.cancelSelectedNode();
	}else if("IOS" == treeNode.platform){
        zTree.selectNode(treeNode);
        $('#ios').menu('show', { left: event.pageX,
                                top:  event.pageY,
                                hideOnUnhover:false});

    }else if ("native" == treeNode.platform){
        zTree.selectNode(treeNode);
        $('#native').menu('show', { left: event.pageX,
                                top:  event.pageY,
                                hideOnUnhover:false});
    } else if (treeNode.NativeTag) {
	    zTree.selectNode(treeNode);
        $('#custom').menu('show', { left: event.pageX,
                                top:  event.pageY,
                                hideOnUnhover:false});
    } else if (treeNode && !treeNode.noparent && treeNode.isParent) {
		// console.log();
		zTree.selectNode(treeNode);
		$('#mm').menu('show', { left: event.pageX,
								top:  event.pageY,
								hideOnUnhover:false});

	}else if(treeNode.noparent){
		zTree.selectNode(treeNode);
		$('#mm1').menu('show', { left: event.pageX,
								top:  event.pageY,
								hideOnUnhover:false});
	}

    $('#mm').menu({

        onClick: function(item) {
            if (item.name == 'sendhooks') {
        	   sendhooks();
            } else if (item.name == 'modify' && !$('#modifyNode').attr('disabled')) {
                alert("修改节点");
            } else if (item.name == 'del' && !$('#delNode').attr('disabled')) {
         /*
         if (treeNode.children && treeNode.children.length > 0) {
          alert("该节点是父节点，还要继续删除么？");
         }*/
                alert("删除节点");
            }
        }
    });

    $('#mm1').menu({

        onClick: function(item) {
            if (item.name == 'SendtotoBurp') {
                sendtoburp();
            // alert("新增节点");
            // } else if (item.name == 'modify' && !$('#modifyNode').attr('disabled')) {
            //  alert("修改节点");
            // } else if (item.name == 'del' && !$('#delNode').attr('disabled')) {
             /*
             if (treeNode.children && treeNode.children.length > 0) {
              alert("该节点是父节点，还要继续删除么？");
             }*/

            }
        }
    });


    $('#ios').menu({

        onClick: function(item) {
            if (item.name == 'SendtotoBurp') {
                sendtoburp();
            }else if (item.name == 'sendhooks') {
                sendhooks();
            }
        }
    });
    
    $('#custom').menu({

        onClick: function(item) {
            // if (item.name == 'Generate hook script') {
                ghookscript();
            // }
        }
    });

    $('#native').menu({

        onClick: function(item) {
            if (item.name == 'enumerateExports') {
                enumerateMoudleByName('enumerateExports');
            }else if (item.name == 'enumerateRegisterNatives') {
                enumerateMoudleByName('enumerateRegisterNatives');
            }else if (item.name == 'enumerateImports') {
                enumerateMoudleByName('enumerateImports');
            }else if (item.name == 'enumerateSymbols') {
                enumerateMoudleByName('enumerateSymbols');
            }
        }
    });

}