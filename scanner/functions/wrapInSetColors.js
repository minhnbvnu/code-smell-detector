function wrapInSetColors(effects) {
    return effects.map((e) => e instanceof expr_1.ExprVec4 || e instanceof EffectLoop ? e : new setcolorexpr_1.SetColorExpr(e));
}