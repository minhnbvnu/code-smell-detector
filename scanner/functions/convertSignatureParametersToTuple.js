function convertSignatureParametersToTuple(decl) {
                const members = map(decl.parameters, convertParameterToNamedTupleMember);
                return setEmitFlags(factory.createTupleTypeNode(members), some(members, (m) => !!length(getSyntheticLeadingComments(m))) ? 0 /* None */ : 1 /* SingleLine */);
            }