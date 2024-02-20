function renderPackageNameValidationFailure(result, typing) {
            return typeof result === "object" ? renderPackageNameValidationFailureWorker(typing, result.result, result.name, result.isScopeName) : renderPackageNameValidationFailureWorker(typing, result, typing, 
            /*isScopeName*/
            false);
        }