function RegisterController(registers) {
      this.registers = registers;
      this.unnamedRegister = registers['"'] = new Register();
      registers['.'] = new Register();
      registers[':'] = new Register();
      registers['/'] = new Register();
    }