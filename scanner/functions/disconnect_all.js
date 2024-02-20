function disconnect_all(obj) {
            const receivers = exports.receivers_for_sender.get(obj);
            if (receivers != null && receivers.length !== 0) {
                for (const connection of receivers) {
                    connection.signal = null;
                }
                schedule_cleanup(receivers);
            }
            const senders = senders_for_receiver.get(obj);
            if (senders != null && senders.length !== 0) {
                for (const connection of senders) {
                    connection.signal = null;
                }
                schedule_cleanup(senders);
            }
        }