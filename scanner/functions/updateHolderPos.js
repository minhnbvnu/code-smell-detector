function updateHolderPos(){
        var toolbarbox = me.ui.getDom('toolbarbox');
        if (toolbarbox) {
            holder.style.top = toolbarbox.offsetHeight + 3 + 'px';
        }
        holder.style.zIndex = Math.max(me.options.zIndex, me.iframe.style.zIndex) + 1;
    }