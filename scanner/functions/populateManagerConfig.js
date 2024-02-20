function populateManagerConfig() {
        payloadsElement = document.getElementById('payloads');
        for (let p of configuration.getAttackPayloads()) {
            let option = document.createElement('option');
            option.value = p.getName();
            let port = '';
            if (p.getPorts().length > 0) {
                port = ' (default port ' + p.getPorts() + ')';
            }
            option.text = p.getName() + port;
            payloadsElement.add(option, 0);
        }
        document.getElementById('attackhostdomain').value = configuration.getAttackHostDomain();
        document.getElementById('attackhostipaddress').value = configuration.getAttackHostIPAddress();
        document.getElementById('targethostipaddress').value = configuration.getTargetHostIPAddress();
        document.getElementById('dummyport').value = configuration.getDummyPort();
        document.getElementById('indextoken').value = configuration.getIndexToken();
        document.getElementById('interval').value = configuration.getInterval();
        document.getElementById('wsproxyport').value = configuration.getWsProxyPort();
        document.getElementById(configuration.getRebindingStrategy()).selected = true;
        document.getElementById('attackmethod').value = configuration.getAttackMethod();
        document.getElementById('flushdns').checked = configuration.getFlushDns();
    }