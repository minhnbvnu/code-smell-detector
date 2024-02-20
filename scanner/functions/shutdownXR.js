async function shutdownXR(session) {
    if (session) {
        await session.end();
    }
}