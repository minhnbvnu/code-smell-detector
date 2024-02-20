function removeEmptySpans(invalue){
                                        var rt;
                                        jQuery.each(invalue,function(cnt,el){
                                            if(el.type!="none"){
                                                if(el.children.length>1){
                                                    if(el.type=="full"){
                                                        rt = Aloha.Selection.getRangeObject();
                                                        GENTICS.Utils.Dom.removeMarkup( rangeObject, jQuery("<span>"), limit );
                                                    }
                                                    removeEmptySpans(el.children);
                                                } else {
                                                    if(el.type=="full"){
                                                        var html_markup_name = el.domobj.nodeName;
                                                        var jq_html_markup = jQuery(el.domobj);
                                                        if((html_markup_name=="SPAN")&&(jq_html_markup.attr("class")==undefined)&&(jq_html_markup.attr("style")==undefined)){
                                                            rt = Aloha.Selection.getRangeObject();
                                                            GENTICS.Utils.Dom.recursiveRemoveMarkup( rt.getRangeTree("SPAN"), jQuery("<span>") );
                                                        }  

                                                    }

                                                }
                                            }
                                        });
                                    }