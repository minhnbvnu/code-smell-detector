function createTooltip(container) {
        var exists = container.select('#chart-popover'),
            popover,
            content;

        if (exists.empty()) {
            popover = container.append('div');

            popover.attr('class', 'popover top')
                .attr('id', 'chart-popover')
                .append('div').attr('class', 'arrow');

            content = popover.append('div')
                .attr('class', 'popover-content');

            // stop flickering tooltips.
            container.on('mouseout', stop);
            popover.on('mouseout', stop);
            return {frame: popover, content: content};
        }
        popover = exists;
        content = exists.select('.popover-content');
        return {frame: popover, content: content};
    }