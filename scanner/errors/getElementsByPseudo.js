function getElementsByPseudo (previousMatch, pseudoClass, pseudoValue) {
				prevParents = [];
				var pseudo = pseudoClass.split("-"), matchingElms = [], idx = 0, checkNodeName = /\-of\-type$/.test(pseudoClass), recur,
				match = {
					first: function(el) { return !navigate(el, "previous", checkNodeName); },
					last: function(el) { return !navigate(el, "next", checkNodeName); },
					empty: function(el) {
						for (var node=el.firstChild; node!==null; node=node.nextSibling) {
							if (node.nodeType === 1 && node.nodeName !== "!" || node.nodeType === 3) { return false; }
						}
						return true;
					},
					enabled: function(el) { return !el.disabled && el.type !== "hidden"; },
					disabled: function(el) { return el.disabled; },
					checked: function(el) { return el.checked; },
					contains: function(el) { return (el.innerText || el.textContent || "").indexOf(pseudoValue.replace(regex.quoted, "$1")) > -1; },
					other: function(el) { return getAttr(el, pseudoClass) === pseudoValue; }
				};
				function basicMatch(key) {
					while ((previous=previousMatch[idx++])) {
						if (notComment(previous) && match[key](previous)) {
							matchingElms[matchingElms.length] = previous;
						}
					}
					return matchingElms;
				}
				var word = pseudo[0] || null;
				if (word && match[word]) {
					return basicMatch(word);
				}
				switch (word) {
					case "only":
						var kParent, kTag;
						while ((previous=previousMatch[idx++])) {
							prevParent = previous.parentNode;
							var q = previous.nodeName;
							if (prevParent !== kParent || q !== kTag) {
								if (match.first(previous) && match.last(previous)) {
									matchingElms[matchingElms.length] = previous;
								}
								kParent = prevParent;
								kTag = q;
							}
						}
						break;
					case "nth":
						if (pseudoValue === "n") {
							matchingElms = previousMatch;
						}
						else {
							var direction = (pseudo[1] === "last")? ["lastChild", "previousSibling"] : ["firstChild", "nextSibling"];
							sequence = DOMAssistant.getSequence(pseudoValue);
							if (sequence) {
								while ((previous=previousMatch[idx++])) {
									prevParent = previous.parentNode;
									prevParent.childElms = prevParent.childElms || {};
									var p = previous.nodeName;
									if (!prevParent.childElms[p]) {
										var childCount = 0;
										iteratorNext = sequence.start;
										childElm = prevParent[direction[0]];
										while (childElm && (sequence.max < 0 || iteratorNext <= sequence.max)) {
											var c = childElm.nodeName;
											if ((checkNodeName && c === p) || (!checkNodeName && childElm.nodeType === 1 && c !== "!")) {
												if (++childCount === iteratorNext) {
													if (c === p) { matchingElms[matchingElms.length] = childElm; }
													iteratorNext += sequence.add;
												}
											}
											childElm = childElm[direction[1]];
										}
										if (anyTag) { sort++; }
										prevParent.childElms[p] = true;
										prevParents[prevParents.length] = prevParent;
									}
								}
								clearChildElms();
							}
						}
						break;
					case "target":
						var hash = document.location.hash.slice(1);
						if (hash) {
							while ((previous=previousMatch[idx++])) {
								if (getAttr(previous, "name") === hash || getAttr(previous, "id") === hash) {
									matchingElms[matchingElms.length] = previous;
									break;
								}
							}
						}
						break;
					case "not":
						if ((recur = regex.pseudo.exec(pseudoValue))) {
							matchingElms = subtractArray(previousMatch, getElementsByPseudo(previousMatch, recur[1]? recur[1].toLowerCase() : null, recur[3] || null));
						}
						else {
							for (var re in regex) {
								if (regex[re].lastIndex) {
									regex[re].lastIndex = 0;
								}
							}
							pseudoValue = pseudoValue.replace(regex.id, "[id=$1]");
							var notTag = regex.tag.exec(pseudoValue);
							var notClass = regex.classes.exec(pseudoValue);
							var notAttr = regex.attribs.exec(pseudoValue);
							var notRegExp = new RegExp(notAttr? attrToRegExp(notAttr[4], notAttr[2]) || "" : "(^|\\s)" + (notTag? notTag[0] : notClass? notClass[1] : "") + "(\\s|$)", "i");
							while ((notElm=previousMatch[idx++])) {
								addElm = null;
								if (notTag && !notRegExp.test(notElm.nodeName) || notClass && !notRegExp.test(notElm.className)) {
									addElm = notElm;
								}
								else if (notAttr) {
									var att = getAttr(notElm, notAttr[1]);
									if (!def(att) || att === false || typeof att === "string" && !notRegExp.test(att)) {
										addElm = notElm;
									}
								}
								if (addElm && !addElm.added) {
									addElm.added = true;
									matchingElms[matchingElms.length] = addElm;
								}
							}
						}
						break;
					default: return basicMatch("other");
				}
				return matchingElms;
			}