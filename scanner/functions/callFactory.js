function callFactory(target = null, options = {}, type = null) {
        // Return a specific type of Call when requested.
        let call = null

        if (type) {
            if (type === 'CallSIP') {
                call = new SipCall(app, target, options)
            } else if (type === 'ConnectAB') {
                call = new ConnectABCall(app, target, options)
            }
        } else {
            // Let application state decide.
            if (app.state.user.authenticated) {
                if (app.state.settings.webrtc.enabled) {
                    call = new SipCall(app, target, options)
                } else {
                    // Fallback to the vendor API.
                    call = new ConnectABCall(app, target, options)
                }
            }
        }

        if (call) return call
        throw 'Factory couldn\'t produce a valid Call target!'
    }