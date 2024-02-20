function CoreServices() {
  this.userPlans = {
    Basic: 0,
    Standard: 1,
    Premium: 2,
    Deluxe: 3,
    Topaz: 4,
    Ruby: 5,
    Gold: 6,
    Platinum: 7,
  };
  this.userPlansAccount = {
    0: 2,
    1: 10,
    2: 20,
    3: 50,
    4: 100,
    5: 200,
    6: 500,
    7: 1000,
  };
  this.userPlansTeamMember = {
    0: 1,
    1: 5,
    2: 10,
    3: 20,
    4: 30,
    5: 50,
    6: 80,
    7: 100,
  };
  this.webhooksSupportedAccountType = ['2', '4', '9'];
  this.networks = {
    Facebook: 1,
    FacebookPage: 2,
    FacebookGroup: 3,
    Twitter: 4,
    Instagram: 5,
    LinkedIn: 6,
    LinkedInCompany: 7,
    GooglePlus: 8,
    Youtube: 9,
    GoogleAnalytics: 10,
    Pinterest: 11,
    InstagramBusiness: 12,
    Bitly: 13,
    Tumblr: 16,
    TikTok: TIK_TOK_CONSTANTS.ACCOUNT_TYPE,
  };
}