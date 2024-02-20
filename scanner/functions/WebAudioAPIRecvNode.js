function WebAudioAPIRecvNode(_args) {
            WebAudioAPINode.call(this, _args);

            var _ = this._;
            _.mode = "recv";
            _.script.onaudioprocess = make_recv_process(this);
            _.gain = context.createGain();
            _.gain.gain.value = 0;
            _.script.connect(_.gain);
        }