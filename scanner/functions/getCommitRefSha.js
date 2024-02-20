async function getCommitRefSha({ scm, token, ref, refType, checkoutUrl, scmContext }) {
    // For example, git@github.com:screwdriver-cd/data-schema.git => screwdriver-cd, data-schema
    const owner = CHECKOUT_URL_SCHEMA_REGEXP.exec(checkoutUrl)[2];
    const repo = CHECKOUT_URL_SCHEMA_REGEXP.exec(checkoutUrl)[3];

    return scm.getCommitRefSha({
        token,
        owner,
        repo,
        ref,
        refType,
        scmContext
    });
}