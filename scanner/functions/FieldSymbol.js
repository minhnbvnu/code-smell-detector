function FieldSymbol(name, location, unitIndex, canWrite, field) {
                _super.call(this, name, location, name.length, unitIndex);
            this.canWrite = canWrite;
            this.field = field;
            this.getter = null;
            this.setter = null;
            this.hasBeenEmitted = false;
            this.name = name;
            this.location = location;
        }