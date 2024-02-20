function disconnect_sender(sender) {
            var _a;
            const receivers = exports.receivers_for_sender.get(sender);
            if (receivers == null || receivers.length === 0)
                return;
            for (const connection of receivers) {
                if (connection.signal == null)
                    return;
                const receiver = (_a = connection.context) !== null && _a !== void 0 ? _a : connection.slot;
                connection.signal = null;
                schedule_cleanup(senders_for_receiver.get(receiver));
            }
            schedule_cleanup(receivers);
        }