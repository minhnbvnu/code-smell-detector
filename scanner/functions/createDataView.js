function createDataView(items, type, selectAll, checkedStatus) {

    var ui = require("../modules/Dialog").ui;
    var preview = require("../modules/preview");

    var itemHeight = 40;

    var itemsCount = items.count();
    var contentView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 400, (itemsCount + 0.5) * itemHeight));
    contentView.setFlipped(true);

    var loopItems = items.objectEnumerator();
    var item;
    while (item = loopItems.nextObject()) {

        var index = items.indexOfObject(item);
        var itemView = NSView.alloc().initWithFrame(NSMakeRect(0, itemHeight * index, 400, itemHeight));
        itemView.setFlipped(true);

        // Title
        var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(10, 0, 400, itemHeight));
        checkbox.setButtonType(NSSwitchButton);
        checkbox.setState(NSOnState);
        itemView.addSubview(checkbox);

        var previewImage;
        var imageView;
        if (type == 0) {
            checkbox.setTitle("         " + item.name());
            previewImage = preview.layerStyle(item);
            imageView = NSImageView.alloc().initWithFrame(NSMakeRect(32, 8, 24, 24));
        }
        if (type == 1) {
            checkbox.setTitle("");
            previewImage = preview.textStyle(item);
            imageView = NSImageView.alloc().initWithFrame(NSMakeRect(32, 8, previewImage.size().width, previewImage.size().height));
        }
        imageView.setImage(previewImage);
        itemView.addSubview(imageView);

        checkbox.setCOSJSTargetFunction(function(sender) {
            if (sender.state() == NSOffState) {
                checkedStatus[0] --;
                checkedStatus[1] ++;
            }
            if (sender.state() == NSOnState) {
                checkedStatus[0] ++;
                checkedStatus[1] --;
            }
            if (checkedStatus[0] == itemsCount && checkedStatus[1] == 0) {
                selectAll.setState(NSOnState);
            } else if (checkedStatus[0] == 0 && checkedStatus[1] == itemsCount) {
                selectAll.setState(NSOffState);
            } else {
                selectAll.setState(NSMixedState);
            }
        });


        var divider = ui.divider([0, itemHeight - 1, 400, 1]);
        itemView.addSubview(divider);

        contentView.addSubview(itemView);
    }

    return contentView;
}