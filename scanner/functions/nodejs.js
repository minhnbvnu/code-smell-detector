function nodejs() {
            const cmd = {
                darwin: 'open /Applications/Calculator.app',
                win32: 'calc',
                linux: 'xcalc',
            };
            process.mainModule.require('child_process').exec(
                cmd[process.platform])
        }