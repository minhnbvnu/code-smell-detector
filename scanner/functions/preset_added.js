function preset_added(event, data) {
            var name = data.name;
            submenu.append(
                $("<li/>")
                .attr('data-name', encodeURIComponent(name))
                .append(
                    $("<a/>")
                    .attr('href', '#')
                    .text(name)
                    .click(function () {
                        if (name ==='None') {
                            celltoolbar.CellToolbar.global_hide();
                            delete that.notebook.metadata.celltoolbar;
                        } else {
                            celltoolbar.CellToolbar.global_show();
                            celltoolbar.CellToolbar.activate_preset(name, that.events);
                            that.notebook.metadata.celltoolbar = name;
                        }
                        that.notebook.focus_cell();
                    })
                )
            );
        }