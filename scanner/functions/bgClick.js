function bgClick(evt)
        {
            this.trigger('userclose');
            this.close();
            evt.stopPropagation();
        }