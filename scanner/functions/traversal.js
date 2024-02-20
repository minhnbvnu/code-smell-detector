function traversal(node, Directory) {
                        var level,
                            tmpSection = null,
                            parent,
                            child,
                            children = node.childNodes;
                        for (var i = 0, len = children.length; i < len; i++) {
                            child = children[i];
                            level = getSectionLevel(child);
                            if (level >= 0) {
                                var address = me.selection.getRange().selectNode(child).createAddress(true).startAddress,
                                    current = getSection({
                                        'tag': child.tagName,
                                        'title': child.innerText || child.textContent || '',
                                        'level': level,
                                        'dom': child,
                                        'startAddress': utils.clone(address, []),
                                        'endAddress': utils.clone(address, []),
                                        'children': []
                                    });
                                previous.nextSection = current;
                                current.previousSection = previous;
                                parent = previous;
                                while(level <= parent.level){
                                    parent = parent.parentSection;
                                }
                                current.parentSection = parent;
                                parent.children.push(current);
                                tmpSection = previous = current;
                            } else {
                                child.nodeType === 1 && traversal(child, Directory);
                                tmpSection && tmpSection.endAddress[tmpSection.endAddress.length - 1] ++;
                            }
                        }
                    }