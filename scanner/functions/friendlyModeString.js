function friendlyModeString (event_modes, alt_target) {
            var modes = {}, return_string;

            // If no default given, use the main event info
            if (!event_modes) {
                event_modes = event.modes;
                alt_target = event.target;
            }

            // Reformat the mode object to make it easier to work with
            _.each(event_modes, function (mode){
                var param = mode.param || alt_target || '';

                // Make sure we have some modes for this param
                if (!modes[param]) {
                    modes[param] = {'+':'', '-':''};
                }

                modes[param][mode.mode[0]] += mode.mode.substr(1);
            });

            // Put the string together from each mode
            return_string = [];
            _.each(modes, function (modeset, param) {
                var str = '';
                if (modeset['+']) str += '+' + modeset['+'];
                if (modeset['-']) str += '-' + modeset['-'];
                return_string.push(str + ' ' + param);
            });
            return_string = return_string.join(', ');

            return return_string;
        }