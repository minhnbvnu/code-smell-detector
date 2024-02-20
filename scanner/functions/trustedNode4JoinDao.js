async function trustedNode4JoinDao() {
            await registerNode({from: trustedNode4});
            await setNodeTrusted(trustedNode4, 'saas_4', 'node@home.com', owner);
        }