function Assertion (obj, msg, ssfi, lockSsfi) {
      flag(this, 'ssfi', ssfi || Assertion);
      flag(this, 'lockSsfi', lockSsfi);
      flag(this, 'object', obj);
      flag(this, 'message', msg);

      return util.proxify(this);
    }