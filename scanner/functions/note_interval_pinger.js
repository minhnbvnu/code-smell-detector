function note_interval_pinger() {
    if (new Date() - last_ping > 2000) {
        collaborator_socket.emit('ping-note',
            { 'channel': 'case-' + get_caseid() + '-notes', 'note_id': note_id });
        last_ping = new Date();
    }
}