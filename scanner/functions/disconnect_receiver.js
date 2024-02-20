function disconnect_receiver(receiver, slot, except_senders) {
            const senders = senders_for_receiver.get(receiver);
            if (senders == null || senders.length === 0)
                return;
            for (const connection of senders) {
                if (connection.signal == null)
                    return;
                if (slot != null && connection.slot != slot)
                    continue;
                const sender = connection.signal.sender;
                if (except_senders != null && except_senders.has(sender))
                    continue;
                connection.signal = null;
                schedule_cleanup(exports.receivers_for_sender.get(sender));
            }
            schedule_cleanup(senders);
        }