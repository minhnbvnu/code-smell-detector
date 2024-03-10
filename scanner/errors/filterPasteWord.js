                .replace( /(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function( str, tag, tmp, style ) {
                    var n = [],
                        s = style.replace( /^\s+|\s+$/, '' )
                            .replace(/&#39;/g,'\'')
                            .replace( /&quot;/gi, "'" )
                            .replace(/[\d.]+(cm|pt)/g,function(str){
                                return utils.transUnitToPx(str)
                            })
                            .split( /;\s*/g );

                    for ( var i = 0,v; v = s[i];i++ ) {

                        var name, value,
                            parts = v.split( ":" );

                        if ( parts.length == 2 ) {
                            name = parts[0].toLowerCase();
                            value = parts[1].toLowerCase();
                            if(/^(background)\w*/.test(name) && value.replace(/(initial|\s)/g,'').length == 0
                                ||
                                /^(margin)\w*/.test(name) && /^0\w+$/.test(value)
                            ){
                                continue;
                            }

                            switch ( name ) {
                                case "mso-padding-alt":
                                case "mso-padding-top-alt":
                                case "mso-padding-right-alt":
                                case "mso-padding-bottom-alt":
                                case "mso-padding-left-alt":
                                case "mso-margin-alt":
                                case "mso-margin-top-alt":
                                case "mso-margin-right-alt":
                                case "mso-margin-bottom-alt":
                                case "mso-margin-left-alt":
                                //ie下会出现挤到一起的情况
                               //case "mso-table-layout-alt":
                                case "mso-height":
                                case "mso-width":
                                case "mso-vertical-align-alt":
                                    //trace:1819 ff下会解析出padding在table上
                                    if(!/<table/.test(tag))
                                        n[i] = name.replace( /^mso-|-alt$/g, "" ) + ":" + transUnit( value );
                                    continue;
                                case "horiz-align":
                                    n[i] = "text-align:" + value;
                                    continue;

                                case "vert-align":
                                    n[i] = "vertical-align:" + value;
                                    continue;

                                case "font-color":
                                case "mso-foreground":
                                    n[i] = "color:" + value;
                                    continue;

                                case "mso-background":
                                case "mso-highlight":
                                    n[i] = "background:" + value;
                                    continue;

                                case "mso-default-height":
                                    n[i] = "min-height:" + transUnit( value );
                                    continue;

                                case "mso-default-width":
                                    n[i] = "min-width:" + transUnit( value );
                                    continue;

                                case "mso-padding-between-alt":
                                    n[i] = "border-collapse:separate;border-spacing:" + transUnit( value );
                                    continue;

                                case "text-line-through":
                                    if ( (value == "single") || (value == "double") ) {
                                        n[i] = "text-decoration:line-through";
                                    }
                                    continue;
                                case "mso-zero-height":
                                    if ( value == "yes" ) {
                                        n[i] = "display:none";
                                    }
                                    continue;
//                                case 'background':
//                                    break;
                                case 'margin':
                                    if ( !/[1-9]/.test( value ) ) {
                                        continue;
                                    }

                            }

                            if ( /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test( name )
                                ||
                                /text\-indent|padding|margin/.test(name) && /\-[\d.]+/.test(value)
                            ) {
                                continue;
                            }

                            n[i] = name + ":" + parts[1];
                        }
                    }
                    return tag + (n.length ? ' style="' + n.join( ';').replace(/;{2,}/g,';') + '"' : '');
                })