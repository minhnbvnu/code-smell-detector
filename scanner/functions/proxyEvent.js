function proxyEvent(event_name, event_data) {
                if (proxy_event_name == 'all') {
                } else {
                    event_data = event_name.event_data;
                    event_name = event_name.event_name;
                }

                this.trigger(event_name, event_data);
            }