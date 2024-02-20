function Paging($el, param) {
        var self = this;
        this.isPaging = true;
        this.$el = $el;
        this.param = $.extend({}, defaultParam, param);
        param = this.param;
        this.pageNum = param.pageNum;

        var validMsg = validParam(param, $el);
        if (validMsg !== true) {
            console.error(validMsg);
            return;
        }
        this.pageAt = 1;
        this.init();

        this.$el.on('click', '.normal-page', function(){
            if($(this).closest('li').hasClass('current')){
                return;
            }
            var pageAt = parseInt($(this).attr('data-id'), 10);
            self.setPageAt(pageAt);
        });

        this.$el.on('click', '.first-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            self.setPageAt(1);
        });

        this.$el.on('click', '.prev-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            var pageAt = self.pageAt - 1;
            self.setPageAt(pageAt);
        });

        this.$el.on('click', '.last-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            self.setPageAt(self.pageNum);
        });

        this.$el.on('click', '.next-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            var pageAt = self.pageAt + 1;
            self.setPageAt(pageAt);
        });
    }