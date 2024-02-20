function Node4(kind, pos, end) {
            this.pos = pos;
            this.end = end;
            this.kind = kind;
            this.id = 0;
            this.flags = 0 /* None */;
            this.modifierFlagsCache = 0 /* None */;
            this.transformFlags = 0 /* None */;
            this.parent = void 0;
            this.original = void 0;
            this.emitNode = void 0;
        }