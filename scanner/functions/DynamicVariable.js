function DynamicVariable(type, data) {
            this.id = (VARIABLE_COUNTER++);
            this.type = type;
            this.data = data;
        }