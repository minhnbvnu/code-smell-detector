function isDistributionDependent(root) {
                return root.isDistributive && (isTypeParameterPossiblyReferenced(root.checkType, root.node.trueType) || isTypeParameterPossiblyReferenced(root.checkType, root.node.falseType));
            }