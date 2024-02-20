function shutdown() {
        bouncer.close();

        if (tunnel) {
            tunnel.close();
        }

        if (support_server) {
            support_server.process.kill('SIGKILL');
        }
    }