function matchHeight(){
        $(document).ready(function(){
            // console.log('matchHeight called');
            let groupName = $('.card');
            if(groupName.length > 0){
                initialized = true;
            }
            // console.log('cards', groupName);
            let groupHeights = [];

            groupName.css('min-height', 'auto');

            groupName.each(function() {
                groupHeights.push($(this).outerHeight());
                // console.log("each height:", $(this).outerHeight());
            });

            let maxHeight = Math.max.apply(null, groupHeights);
            groupName.css('min-height', maxHeight);
        });
    }