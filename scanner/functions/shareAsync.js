async function shareAsync() {
  await Share.share(
    {
      message: `Check out Bouncy Bacon by @baconbrix`,
      url: 'https://crossyroad.netlify.com',
      title: 'Bouncy Bacon',
    },
    {
      dialogTitle: 'Share Bouncy Bacon',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.AirDrop', // This speeds up showing the share sheet by a lot
        'com.apple.UIKit.activity.AddToReadingList', // This is just lame :)
      ],
      tintColor: Colors.blue,
    },
  );
}