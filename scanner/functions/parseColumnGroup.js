function parseColumnGroup(column, level){
				
				var depth = headerDepth - level;
				
				if(typeof headers[level] === "undefined"){
					headers[level] = [];
				}
				
				column.height = column.subGroups ? 1 : (depth - column.depth) + 1;
				
				headers[level].push(column);
				
				if(column.height > 1){
					for(let i = 1; i < column.height; i ++){
						
						if(typeof headers[level + i] === "undefined"){
							headers[level + i] = [];
						}
						
						headers[level + i].push(false);
					}
				}
				
				if(column.width > 1){
					for(let i = 1; i < column.width; i ++){
						headers[level].push(false);
					}
				}
				
				if(column.subGroups){
					column.subGroups.forEach(function(subGroup){
						parseColumnGroup(subGroup, level+1);
					});
				}
			}