function scriptInit() {
    return { type: SCRIPT,
             funDecls: [],
             varDecls: [],
             modDefns: new Dict(),
             modAssns: new Dict(),
             modDecls: new Dict(),
             modLoads: new Dict(),
             impDecls: [],
             expDecls: [],
             exports: new Dict(),
             hasEmptyReturn: false,
             hasReturnWithValue: false,
             hasYield: false };
}