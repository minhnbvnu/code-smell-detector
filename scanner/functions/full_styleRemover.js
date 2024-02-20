function full_styleRemover(in_rangeTree){
                                        var new_in_rangeTree = in_rangeTree.children;
                                        jQuery(in_rangeTree.domobj).removeAttr("style"); // remove if style at the top of the dom tree                                                
                                        if(new_in_rangeTree.length>0){
                                            jQuery.each(new_in_rangeTree,function(cnt,el) {
                                                full_styleRemover(el);
                                            });
                                        } else {
                                            jQuery(in_rangeTree.domobj).removeAttr("style");
                                        }                                        
                                    }