function partial_styleRemover(in_rangeTree){
                                        var new_in_rangeTree = in_rangeTree.children;
                                        if(new_in_rangeTree.length>1){
                                            jQuery.each(new_in_rangeTree, function(cnt,el) {
                                                if(el.type=="partial"){
                                                    partial_styleRemover(el);
                                                }
                                                if(el.type=="full"){
                                                    full_styleRemover(el);
                                                }
                                            });
                                        }

                                    }