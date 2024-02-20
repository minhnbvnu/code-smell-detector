function handleGridClick(event, args) {
        const item = this.getDataItem(args.row);
        if (item instanceof slickgrid_1.Group && event.target.classList.contains("slick-group-toggle")) {
            if (item.collapsed) {
                this.getData().expandGroup(item.groupingKey);
            }
            else {
                this.getData().collapseGroup(item.groupingKey);
            }
            event.stopImmediatePropagation();
            event.preventDefault();
            this.invalidate();
            this.render();
        }
    }