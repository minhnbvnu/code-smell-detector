function load_all_configs() {
        // clear existing warnings:
        $('.nbext-filter-grp ~ .alert').remove();
        var config_promises = [];
        for (var section in configs) {
            config_promises.push(
                // IIFE to get correct section value
                (function (sect) {
                    return configs[sect].load().catch(function (err) {
                        var alert = $('<div role="alert" class="alert alert-warning alert-dismissable"/>').insertAfter('.nbext-filter-grp');
                        $('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>').appendTo(alert);
                        var desc =  $('<p/>').appendTo(alert)
                        $('<strong>Snap! </strong>').appendTo(desc);
                        $('<span>').text('Failed to load config section "' + sect + '"').appendTo(desc);
                        var deets = $('<details>').appendTo(alert);
                        if (err.xhr_error && err.message) {
                            $('<span>').text(err.xhr_error).appendTo(deets);
                            $('<pre/>').text(err.message).appendTo(deets);
                        }
                        else {
                            $('<pre/>').text(err).appendTo(deets);
                        }
                        return {};
                    })
                })(section)
            );
            configs[section].load();
        }
        return Promise.all(config_promises);
    }