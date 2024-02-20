function compileCatchClause(node, proc, env) {
    proc.add(Catch(node.varName));
    compileStatement(node.block, proc, env.extend({ scope: true }));
    proc.add(Unbind(1));
}