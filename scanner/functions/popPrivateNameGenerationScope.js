function popPrivateNameGenerationScope() {
                privateNameTempFlags = privateNameTempFlagsStack.pop();
                reservedPrivateNames = reservedPrivateNamesStack.pop();
            }