function filterFunc(node) {
			if(node && node.oldname && node.oldname.length>0){
				node[nameKey] = node.oldname; //recover oldname of the node if exist
			}
			zTreeObj.updateNode(node); //update node to for modifications take effect
			if (_keywords.length == 0) {
				//return true to show all nodes if the keyword is blank
				zTreeObj.showNode(node);
				zTreeObj.expandNode(node,isExpand);
				return true;
			}
			//transform node name and keywords to lowercase
			if (node[nameKey] && node[nameKey].toLowerCase().indexOf(_keywords.toLowerCase())!=-1) {
				if(isHighLight){ //highlight process
					//a new variable 'newKeywords' created to store the keywords information 
					//keep the parameter '_keywords' as initial and it will be used in next node
					//process the meta characters in _keywords thus the RegExp can be correctly used in str.replace
					var newKeywords = _keywords.replace(rexMeta,function(matchStr){
						//add escape character before meta characters
						return '\\' + matchStr;
					});
					node.oldname = node[nameKey]; //store the old name  
					var rexGlobal = new RegExp(newKeywords, 'gi');//'g' for global,'i' for ignore case
					//use replace(RegExp,replacement) since replace(/substr/g,replacement) cannot be used here
					node[nameKey] = node.oldname.replace(rexGlobal, function(originalText){
						//highlight the matching words in node namedarkred
						var highLightText =
							'<span style="color: whitesmoke;background-color: green;">'
							+ originalText
							+'</span>';
						return 	highLightText;					
					});
					zTreeObj.updateNode(node); //update node for modifications take effect
				}
				zTreeObj.showNode(node);//show node with matching keywords
				return true; //return true and show this node
			}
			
			zTreeObj.hideNode(node); // hide node that not matched
			return false; //return false for node not matched
		}