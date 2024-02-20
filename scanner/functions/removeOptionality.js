function removeOptionality(type, isOptionalExpression, isOptionalChain2) {
            return isOptionalExpression ? type.getNonNullableType() : isOptionalChain2 ? type.getNonOptionalType() : type;
        }