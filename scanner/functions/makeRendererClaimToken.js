function makeRendererClaimToken(renderer, onReclaim) {
    return {
        id: renderer.poolId,
        claimTime: new Date(),
        renderer: renderer,
        onReclaim: onReclaim,
    };
}