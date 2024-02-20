function disconnect_between(sender, receiver) {
            const receivers = exports.receivers_for_sender.get(sender);
            if (receivers == null || receivers.length === 0)
                return;
            const senders = senders_for_receiver.get(receiver);
            if (senders == null || senders.length === 0)
                return;
            for (const connection of senders) {
                if (connection.signal == null)
                    return;
                if (connection.signal.sender === sender)
                    connection.signal = null;
            }
            schedule_cleanup(receivers);
            schedule_cleanup(senders);
        }