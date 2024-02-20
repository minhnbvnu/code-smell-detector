function renderBackgroundRepeatX(ctx, image, bgp, x, y, w, h){

        var height = Math.min(image.height,h),
        width,bgx;


        bgp.left = bgp.left-Math.ceil(bgp.left/image.width)*image.width;


        for (bgx=(x+bgp.left);bgx<w+x;) {

            if (Math.floor(bgx+image.width)>w+x){
                width = (w+x)-bgx;
            }else{
                width = image.width;
            }

            renderBackgroundRepeat(ctx,image,bgx,(y+bgp.top),width,height,x,y);

            bgx = Math.floor(bgx+image.width);


        }
    }