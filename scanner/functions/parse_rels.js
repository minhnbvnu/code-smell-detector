function parse_rels(data,currentFilePath){if(!data)return data;if(currentFilePath.charAt(0)!=="/"){currentFilePath="/"+currentFilePath}var rels={};var hash={};var resolveRelativePathIntoAbsolute=function(to){var toksFrom=currentFilePath.split("/");toksFrom.pop();var toksTo=to.split("/");var reversed=[];while(toksTo.length!==0){var tokTo=toksTo.shift();if(tokTo===".."){toksFrom.pop()}else if(tokTo!=="."){toksFrom.push(tokTo)}}return toksFrom.join("/")};data.match(tagregex).forEach(function(x){var y=parsexmltag(x);if(y[0]==="<Relationship"){var rel={};rel.Type=y.Type;rel.Target=y.Target;rel.Id=y.Id;rel.TargetMode=y.TargetMode;var canonictarget=y.TargetMode==="External"?y.Target:resolveRelativePathIntoAbsolute(y.Target);rels[canonictarget]=rel;hash[y.Id]=rel}});rels["!id"]=hash;return rels}