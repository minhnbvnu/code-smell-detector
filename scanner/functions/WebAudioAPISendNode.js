function WebAudioAPISendNode(_args) {
            WebAudioAPINode.call(this, _args);
            fn.listener(this);

            var _ = this._;
            _.mode = "send";
            _.script.onaudioprocess = make_send_process(this);
            _.connectIndex = null;
        }