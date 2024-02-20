function UpdateUnitResult(kind, unitIndex, script1, script2) {
            this.kind = kind;
            this.unitIndex = unitIndex;
            this.script1 = script1;
            this.script2 = script2;
            this.scope1 = null;
            this.scope2 = null;
            this.editRange = null;
            this.parseErrors = [];
        }