function processShowNodes(nodesShow,_keywords){
		if(nodesShow && nodesShow.length>0){
			//process the ancient nodes if _keywords is not blank
			if(_keywords.length>0){ 
				$.each(nodesShow, function(n,obj){
					var pathOfOne = obj.getPath();//get all the ancient nodes including current node
					if(pathOfOne && pathOfOne.length>0){ 
						//i < pathOfOne.length-1 process every node in path except self
						for(var i=0;i<pathOfOne.length-1;i++){
							zTreeObj.showNode(pathOfOne[i]); //show node 
							zTreeObj.expandNode(pathOfOne[i],true); //expand node
						}
					}
				});	
			}else{ //show all nodes when _keywords is blank and expand the root nodes
				var rootNodes = zTreeObj.getNodesByParam('level','0');//get all root nodes
				$.each(rootNodes,function(n,obj){
					zTreeObj.expandNode(obj,true); //expand all root nodes
				});
			}
		}
	}