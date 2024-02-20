function reconnect() {
            if (reconnect_step >= reconnect_max_attempts) {
                socket.emit('reconnecting_failed');
                return;
            }

            var delay = reconnect_delay_exponential ?
                (reconnect_last_delay || reconnect_delay / 2) * 2 :
                reconnect_delay * reconnect_step;

            is_reconnecting = true;

            reconnect_tmr = setTimeout(function() {
                socket.open();
            }, delay);

            reconnect_last_delay = delay;

            socket.emit('reconnecting', {
                attempt: reconnect_step + 1,
                max_attempts: reconnect_max_attempts,
                delay: delay
            });

            reconnect_step++;
        }