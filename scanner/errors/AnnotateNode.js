                        msg.annotations.forEach(function(annotation) {
                            ctx.fillStyle = annotation.fill || defaultFill;
                            ctx.strokeStyle = annotation.stroke || defaultStroke;
                            ctx.lineWidth = annotation.lineWidth || defaultLineWidth;
                            ctx.lineJoin = 'bevel';
                            let x,y,r,w,h;

                            if (!annotation.type && annotation.bbox) {
                                annotation.type = 'rect';
                            }

                            switch(annotation.type) {
                                case 'rect':
                                    if (annotation.bbox) {
                                        x = annotation.bbox[0]
                                        y = annotation.bbox[1]
                                        w = annotation.bbox[2]
                                        h = annotation.bbox[3]
                                    } else {
                                        x = annotation.x
                                        y = annotation.y
                                        w = annotation.w
                                        h = annotation.h
                                    }

                                    if (x < 0) {
                                        w += x;
                                        x = 0;
                                    }
                                    if (y < 0) {
                                        h += y;
                                        y = 0;
                                    }
                                    ctx.beginPath();
                                    ctx.lineWidth = annotation.lineWidth || defaultLineWidth;
                                    ctx.rect(x,y,w,h);
                                    ctx.closePath();
                                    ctx.stroke();

                                    if (annotation.label) {
                                        ctx.font = `${annotation.fontSize || defaultFontSize}pt 'Source Sans Pro'`;
                                        ctx.fillStyle = annotation.fontColor || defaultFontColor;
                                        ctx.textBaseline = "top";
                                        ctx.textAlign = "left";
                                        //set offset value so txt is above or below image
                                        if (annotation.labelLocation) {
                                          if (annotation.labelLocation === "top") {
                                            y = y - (20+((defaultLineWidth*0.5)+(Number(defaultFontSize))));
                                            if (y < 0)
                                            {
                                              y = 0;
                                            }
                                          }
                                          else if (annotation.labelLocation === "bottom") {
                                            y = y + (10+h+(((defaultLineWidth*0.5)+(Number(defaultFontSize)))));
                                            ctx.textBaseline = "bottom";

                                          }
                                        }
                                        //if not user defined make best guess for top or bottom based on location
                                        else {
                                          //not enought room above imagebox, put label on the bottom
                                          if (y < 0 + (20+((defaultLineWidth*0.5)+(Number(defaultFontSize))))) {
                                            y = y + (10+h+(((defaultLineWidth*0.5)+(Number(defaultFontSize)))));
                                            ctx.textBaseline = "bottom";
                                          }
                                          //else put the label on the top
                                          else {
                                            y = y - (20+((defaultLineWidth*0.5)+(Number(defaultFontSize))));
                                            if (y < 0) {
                                              y = 0;
                                            }
                                          }
                                        }


                                        ctx.fillText(annotation.label, x,y);
                                    }
                                break;
                                case 'circle':
                                    if (annotation.bbox) {
                                        x = annotation.bbox[0] + annotation.bbox[2]/2
                                        y = annotation.bbox[1] + annotation.bbox[3]/2
                                        r = Math.min(annotation.bbox[2],annotation.bbox[3])/2;
                                    } else {
                                        x = annotation.x
                                        y = annotation.y
                                        r = annotation.r;
                                    }
                                    ctx.beginPath();
                                    ctx.lineWidth = annotation.lineWidth || defaultLineWidth;
                                    ctx.arc(x,y,r,0,Math.PI*2);
                                    ctx.closePath();
                                    ctx.stroke();
                                    if (annotation.label) {
                                        ctx.font = `${annotation.fontSize || defaultFontSize}pt 'Source Sans Pro'`;
                                        ctx.fillStyle = annotation.fontColor || defaultFontColor;
                                        ctx.textBaseline = "middle";
                                        ctx.textAlign = "center";
                                        ctx.fillText(annotation.label, x+2,y)
                                    }
                                break;
                            }
                        });