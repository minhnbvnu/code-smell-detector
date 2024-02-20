function pseudoToXPath (tag, pseudoClass, pseudoValue) {
					tag = /\-child$/.test(pseudoClass)? "*" : tag;
					var pseudo = pseudoClass.split("-"), position = ((pseudo[1] === "last")? "(count(following-sibling::" : "(count(preceding-sibling::") + tag + ") + 1)", recur, hash;
					switch (pseudo[0]) {
						case "nth": return (pseudoValue !== "n" && (sequence = DOMAssistant.getSequence(pseudoValue)))? ((sequence.start === sequence.max)? position + " = " + sequence.start : position + " mod " + sequence.add + " = " + sequence.modVal + ((sequence.start > 1)? " and " + position + " >= " + sequence.start : "") + ((sequence.max > 0)? " and " + position + " <= " + sequence.max: "")) : "";
						case "not": return "not(" + ((recur = regex.pseudo.exec(pseudoValue))? pseudoToXPath(tag, recur[1]? recur[1].toLowerCase() : null, recur[3] || null) : pseudoValue.replace(regex.id, "[id=$1]").replace(regex.tag, "self::$0").replace(regex.classes, "contains(concat(\" \", @class, \" \"), \" $1 \")").replace(regex.attribs, attrToXPath())) + ")";
						case "first": return "not(preceding-sibling::" + tag + ")";
						case "last": return "not(following-sibling::" + tag + ")";
						case "only": return "not(preceding-sibling::" + tag + " or following-sibling::" + tag + ")";
						case "empty": return "not(child::*) and not(text())";
						case "contains": return "contains(., \"" + pseudoValue.replace(regex.quoted, "$1") + "\")";
						case "enabled": return "not(@disabled) and not(@type=\"hidden\")";
						case "disabled": return "@disabled";
						case "target": return "@name=\"" + (hash = document.location.hash.slice(1)) + "\" or @id=\"" + hash + "\"";
						default: return "@" + pseudoClass + "=\"" + pseudoValue + "\"";
					}
				}