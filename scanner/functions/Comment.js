function Comment({comment, commentSource}) {
  const currentUserID = comment.viewer.id;
  const environment = RelayEnvironment.forUser(currentUserID);
  const commentID = nullthrows(comment.id);
  useEffect(() => {
    const subscription = SubscriptionCounter.subscribeOnce(
      `StoreSubscription_${commentID}`,
      () =>
        StoreSubscription.subscribe(
          environment,
          {
            comment_id: commentID,
          },
          currentUserID,
          commentSource
        )
    );
    return () => subscription.dispose();
  }, [commentID, commentSource, currentUserID, environment]);
}