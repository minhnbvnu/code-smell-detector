constructor(animEvaluator, states, transitions, activate, eventHandler, findParameter, consumeTrigger) {
        this._animEvaluator = animEvaluator;
        this._states = {};
        this._stateNames = [];
        this._eventHandler = eventHandler;
        this._findParameter = findParameter;
        this._consumeTrigger = consumeTrigger;
        for (let i = 0; i < states.length; i++) {
            this._states[states[i].name] = new AnimState(
                this,
                states[i].name,
                states[i].speed,
                states[i].loop,
                states[i].blendTree
            );
            this._stateNames.push(states[i].name);
        }
        this._transitions = transitions.map((transition) => {
            return new AnimTransition({
                ...transition
            });
        });
        this._findTransitionsFromStateCache = {};
        this._findTransitionsBetweenStatesCache = {};
        this._previousStateName = null;
        this._activeStateName = ANIM_STATE_START;
        this._activeStateDuration = 0.0;
        this._activeStateDurationDirty = true;
        this._playing = false;
        this._activate = activate;

        this._currTransitionTime = 1.0;
        this._totalTransitionTime = 1.0;
        this._isTransitioning = false;
        this._transitionInterruptionSource = ANIM_INTERRUPTION_NONE;
        this._transitionPreviousStates = [];

        this._timeInState = 0;
        this._timeInStateBefore = 0;
    }