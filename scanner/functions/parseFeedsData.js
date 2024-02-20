function parseFeedsData(response, companyId) {
  let feeds = [];
  let total = response?.paging?.total ?? 0;
  response?.elements?.map(x => {
    let feed = {};
    if (
      !x.specificContent?.[
        'com.linkedin.ugc.ShareContent'
      ]?.media[0]?.media?.includes('poll')
    ) {
      feed.shareMediaCategory =
        x.specificContent?.['com.linkedin.ugc.ShareContent']
          ?.shareMediaCategory ?? '';
      feed.description =
        x.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary
          ?.text ?? '';
      feed.mediaTitle =
        x.specificContent?.['com.linkedin.ugc.ShareContent']?.media[0]?.title
          ?.text ?? '';
      feed.hashtag = x.specificContent?.[
        'com.linkedin.ugc.ShareContent'
      ]?.shareCommentary?.attributes?.map(y =>
        y?.value?.[
          'com.linkedin.common.HashtagAttributedEntity'
        ]?.hashtag?.replace('urn:li:hashtag:', '')
      );
      let mediaUrl = [];
      if (
        x.specificContent?.['com.linkedin.ugc.ShareContent']
          ?.shareMediaCategory == 'VIDEO'
      )
        x.specificContent?.['com.linkedin.ugc.ShareContent']?.media[0]?.[
          'media~'
        ]?.elements?.map(y => {
          if (y?.identifiers[0]?.mediaType == 'video/mp4') {
            if (y?.identifiers[0]?.identifier?.includes('-720p'))
              mediaUrl.push(y?.identifiers[0]?.identifier);
          }
        });
      feed.sharedUrl = '';
      if (
        x.specificContent?.['com.linkedin.ugc.ShareContent']
          ?.shareMediaCategory == 'ARTICLE'
      )
        feed.sharedUrl =
          x.specificContent?.['com.linkedin.ugc.ShareContent']?.media[0]
            ?.originalUrl ?? '';
      feed.publishedAt = moment(x?.firstPublishedAt) ?? '';

      if (
        x.specificContent?.['com.linkedin.ugc.ShareContent']
          ?.shareMediaCategory == 'IMAGE'
      )
        x.specificContent?.['com.linkedin.ugc.ShareContent']?.media?.map(y =>
          mediaUrl.push(y?.originalUrl)
        );
      feed.postId = x?.id;
      feed.postUrl = `https://www.linkedin.com/feed/update/${x?.id}`;
      feed.mediaUrl = mediaUrl;
      feed.socialId = companyId;
      feeds.push(feed);
    }
  });
  return {total, feeds};
}