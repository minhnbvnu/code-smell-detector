function markHovered(item) {
                if (drag_model.hoveredItem !== null) {
                    drag_model.hoveredItem.dragHovered(false);
                }
                drag_model.hoveredItem = item;
                if (item) {
                    item.dragHovered(true);
                }
            }