function renderBackground(el,bounds,ctx){

        // TODO add support for multi background-images
        var background_image = getCSS(el, "backgroundImage"),
        background_repeat = getCSS(el, "backgroundRepeat").split(",")[0],
        image,
        bgp,
        bgy,
        bgw,
        bgsx,
        bgsy,
        bgdx,
        bgdy,
        bgh,
        h,
        height,
        add;

        //   if (typeof background_image !== "undefined" && /^(1|none)$/.test(background_image) === false && /^(-webkit|-moz|linear-gradient|-o-)/.test(background_image)===false){

        if ( !/data:image\/.*;base64,/i.test(background_image) && !/^(-webkit|-moz|linear-gradient|-o-)/.test(background_image) ) {
            background_image = background_image.split(",")[0];
        }

        if ( typeof background_image !== "undefined" && /^(1|none)$/.test( background_image ) === false ) {
            background_image = _html2canvas.Util.backgroundImage( background_image );
            image = loadImage( background_image );


            bgp = _html2canvas.Util.BackgroundPosition(el, bounds, image);

            // TODO add support for background-origin
            if ( image ){
                switch ( background_repeat ) {

                    case "repeat-x":
                        renderBackgroundRepeatX( ctx, image, bgp, bounds.left, bounds.top, bounds.width, bounds.height );
                        break;

                    case "repeat-y":
                        renderBackgroundRepeatY( ctx, image, bgp, bounds.left, bounds.top, bounds.width, bounds.height );
                        break;

                    case "no-repeat":
                        /*
                    this.drawBackgroundRepeat(
                        ctx,
                        image,
                        bgp.left+bounds.left, // sx
                        bgp.top+bounds.top, // sy
                        Math.min(bounds.width,image.width),
                        Math.min(bounds.height,image.height),
                        bounds.left,
                        bounds.top
                        );*/


                       
                        bgw = bounds.width - bgp.left;
                        bgh = bounds.height - bgp.top;
                        bgsx = bgp.left;
                        bgsy = bgp.top;
                        bgdx = bgp.left+bounds.left;
                        bgdy = bgp.top+bounds.top;

                        //
                        //     bgw = Math.min(bgw,image.width);
                        //  bgh = Math.min(bgh,image.height);

                        if (bgsx<0){
                            bgsx = Math.abs(bgsx);
                            bgdx += bgsx;
                            bgw = Math.min(bounds.width,image.width-bgsx);
                        }else{
                            bgw = Math.min(bgw,image.width);
                            bgsx = 0;
                        }

                        if (bgsy<0){
                            bgsy = Math.abs(bgsy);
                            bgdy += bgsy;
                            // bgh = bgh-bgsy;
                            bgh = Math.min(bounds.height,image.height-bgsy);
                        }else{
                            bgh = Math.min(bgh,image.height);
                            bgsy = 0;
                        }


                        if (bgh>0 && bgw > 0){
                            renderImage(
                                ctx,
                                image,
                                bgsx, // source X : 0
                                bgsy, // source Y : 1695
                                bgw, // source Width : 18
                                bgh, // source Height : 1677
                                bgdx, // destination X :906
                                bgdy, // destination Y : 1020
                                bgw, // destination width : 18
                                bgh // destination height : 1677
                                );

                        }
                        break;
                    default:



                        bgp.top = bgp.top-Math.ceil(bgp.top/image.height)*image.height;


                        for(bgy=(bounds.top+bgp.top);bgy<bounds.height+bounds.top;){



                            h = Math.min(image.height,(bounds.height+bounds.top)-bgy);


                            if ( Math.floor(bgy+image.height)>h+bgy){
                                height = (h+bgy)-bgy;
                            }else{
                                height = image.height;
                            }
                            // console.log(height);

                            if (bgy<bounds.top){
                                add = bounds.top-bgy;
                                bgy = bounds.top;

                            }else{
                                add = 0;
                            }

                            renderBackgroundRepeatX(ctx,image,bgp,bounds.left,bgy,bounds.width,height);
                            if (add>0){
                                bgp.top += add;
                            }
                            bgy = Math.floor(bgy+image.height)-add;
                        }
                        break;


                }
            }else{
                h2clog("html2canvas: Error loading background:" + background_image);
            //console.log(images);
            }

        }
    }