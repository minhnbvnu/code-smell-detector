function addTag(tag) {
                                if (!tag) {
                                    return;
                                }
                                if (!tags) {
                                    tags = [tag];
                                    tagsPos = tag.pos;
                                }
                                else {
                                    tags.push(tag);
                                }
                                tagsEnd = tag.end;
                            }