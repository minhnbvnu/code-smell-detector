function Symbol4(flags, name) {
            this.flags = flags;
            this.escapedName = name;
            this.declarations = void 0;
            this.valueDeclaration = void 0;
            this.id = 0;
            this.mergeId = 0;
            this.parent = void 0;
            this.members = void 0;
            this.exports = void 0;
            this.exportSymbol = void 0;
            this.constEnumOnlyModule = void 0;
            this.isReferenced = void 0;
            this.isAssigned = void 0;
            this.links = void 0;
        }