constructor(inputSource) {
        super();

        const xrHand = inputSource._xrInputSource.hand;

        this._manager = inputSource._manager;
        this._inputSource = inputSource;

        if (xrHand.get('wrist')) {
            const joint = new XrJoint(0, 'wrist', this, null);
            this._wrist = joint;
            this._joints.push(joint);
            this._jointsById.wrist = joint;
        }

        for (let f = 0; f < fingerJointIds.length; f++) {
            const finger = new XrFinger(f, this);

            for (let j = 0; j < fingerJointIds[f].length; j++) {
                const jointId = fingerJointIds[f][j];
                if (!xrHand.get(jointId)) continue;

                const joint = new XrJoint(j, jointId, this, finger);

                this._joints.push(joint);
                this._jointsById[jointId] = joint;
                if (joint.tip) {
                    this._tips.push(joint);
                    finger._tip = joint;
                }

                finger._joints.push(joint);
            }
        }
    }