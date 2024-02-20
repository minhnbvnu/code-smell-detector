function addOne(url) {
        var dfd = $.Deferred();
        $canvas.tagcanvas("pause");
        var $newItem = $(tool.makeItem(true, '', tool.$dataWrap.find('li').length));
        $animItem = $newItem.clone();
        $animItem.addClass('anim-start');
        $canvasWrap.append($animItem);
        $animItem.animate({
            'margin-left': 0,
            'margin-top': 0,
            opacity: 0,
            height: 0,
            width: 0
        }, 2000, function() {
            $animItem.remove();
            tool.$dataWrap.append($newItem);
            dfd.resolve();
        });
        return dfd.promise();

        // 修改某个图标
        // var toUpdateIndex = Math.floor(Math.random() * tool.MAKENUM) + 1;
        // var $targetImg = tool.$dataWrap.find('li').eq(toUpdateIndex).find('img');
        // $targetImg.attr('src', 'img/avatar/n-special.jpg');
        // $canvas.tagcanvas("tagtofront", {
        //     index: toUpdateIndex,
        //     callback: function() {
        //         start();
        //     }
        // });

        // $canvas.tagcanvas("setspeed", [0.01, 0.01]);
    }