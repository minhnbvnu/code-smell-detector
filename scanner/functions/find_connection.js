function find_connection(conns, signal, slot, context) {
        return (0, array_1.find)(conns, conn => conn.signal === signal && conn.slot === slot && conn.context === context);
    }