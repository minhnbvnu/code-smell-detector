function SymbolDef(id, scope, orig, init) {
    this.eliminated = 0;
    this.exported = false;
    this.global = false;
    this.id = id;
    this.init = init;
    this.mangled_name = null;
    this.name = orig.name;
    this.orig = [ orig ];
    this.references = [];
    this.replaced = 0;
    this.scope = scope;
    this.undeclared = false;
}