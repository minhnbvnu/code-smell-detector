function toggleCellClass($cell, times) {
                if (!times) {
                    return;
                }
                setTimeout(function () {
                    $cell.queue(function () {
                        $cell.toggleClass(options.cellFlashingCssClass).dequeue();
                        toggleCellClass($cell, times - 1);
                    });
                }, speed);
            }