function createSyntheticBlockForConvertedStatements(statements) {
                return setEmitFlags(factory2.createBlock(factory2.createNodeArray(statements), 
                /*multiLine*/
                true), 96 /* NoSourceMap */ | 768 /* NoTokenSourceMaps */);
            }