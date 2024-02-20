function renderBackgroundRepeatY (ctx, image, bgp, x, y, w, h){

        var height,
        width = Math.min(image.width,w),bgy;

        bgp.top = bgp.top-Math.ceil(bgp.top/image.height)*image.height;


        for(bgy=(y+bgp.top);bgy<h+y;){


            if ( Math.floor(bgy+image.height)>h+y){
                height = (h+y)-bgy;
            }else{
                height = image.height;
            }
            renderBackgroundRepeat(ctx,image,x+bgp.left,bgy,width,height,x,y);

            bgy = Math.floor(bgy+image.height);

        }
    }