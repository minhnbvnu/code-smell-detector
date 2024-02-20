async function read_stdin() {
        const stdin = process.stdin;
        stdin.setEncoding("utf-8");
        stdin.resume();
        let data = "";
        for await (const chunk of stdin) {
            data += chunk;
        }
        return data;
    }