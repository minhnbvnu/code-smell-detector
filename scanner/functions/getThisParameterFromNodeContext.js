function getThisParameterFromNodeContext(node) {
                const thisContainer = getThisContainer(node, 
                /* includeArrowFunctions */
                false, 
                /*includeClassComputedPropertyName*/
                false);
                return thisContainer && isFunctionLike(thisContainer) ? getThisParameter(thisContainer) : void 0;
            }