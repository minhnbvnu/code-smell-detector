function getEditableByBlock($block) {
        return $block.parents('.aloha-editable').filter(':first');
    }