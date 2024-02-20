function finishEventDispatch() {
        _evCfg.eventPhase = phases.NONE;
        _evCfg.currentTarget = null;
        delete _evCfg._children;
      }