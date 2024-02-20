function VarSpec (name, vhfn, nums) {
        this.name = unescape(name);
        this.valueHandler = vhfn;
        this.maxLength = nums;
    }