function checkChangeComponents(comps, setter, vec) {
    // setter has different length than components
    if (comps.length !== getcompexpr_1.typeStringToLength(setter.typeString())) {
        throw new Error("components length must be equal to the target float/vec");
    }
    // duplicate components
    if (duplicateComponents(comps)) {
        throw new Error("duplicate components not allowed on left side");
    }
    // legal components
    getcompexpr_1.checkLegalComponents(comps, vec);
}