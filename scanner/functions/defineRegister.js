function defineRegister(name, register) {
      var registers = vimGlobalState.registerController.registers;
      if (!name || name.length != 1) {
        throw Error('Register name must be 1 character');
      }
      if (registers[name]) {
        throw Error('Register already defined ' + name);
      }
      registers[name] = register;
      validRegisters.push(name);
    }