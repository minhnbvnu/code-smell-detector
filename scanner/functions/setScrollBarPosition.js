function setScrollBarPosition(){
        var max = items.length;
        visibleIitems = Math.floor(me.height/lineHeight);
        if (me.centerSelection){visibleIitems = 1;}

        var startTop = 18;
        var top = startTop;
        var startHeight = me.height - 4 - 32;
        var height = startHeight;
        scrollBarItemOffset = 0;

        if (max>visibleIitems){
            height = Math.floor((visibleIitems / max) * startHeight);
            if (height<12) height = 12;

            scrollBarItemOffset = (startHeight - height) / (max-visibleIitems);

        }

        if (visibleIndex && scrollBarItemOffset){
            top = Math.floor(startTop + scrollBarItemOffset*visibleIndex);
        }

        scrollBar.setProperties({
            left: me.width - 18,
            top: top,
            width: 16,
            height: height
        });
    }