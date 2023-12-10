export interface CampaignEntity {
  id: number;
  name: string;
  description: string;
  start: Date;
  end: Date;
  type: string;
  image: string;
  reward: string;
  userLimit: number;
  category: string;
  categoryTarget: string;
  userOwner: number;
}
// export interface CreateCampaignEntity {
//   campaignName: string;
//   campaignDetail: string;
//   campaignStart: string;
//   campaignEnd: string;
//   campaignType: string;
//   campaignImageUrl: string;
//   campaignUserLimit: number;
//   campaignCategoryId: number;
//   campaignReward: string;
//   userId: number;
// }
export interface CampaignCategoriesEntity {
  campaignCategoryId: number;
  categoryName: string;
  categoryTarget: string;
}

export interface CampaignState {
  ownedCampaignList: Partial<CampaignEntity[]>;
  popularCampaignList: Partial<CampaignEntity[]>;
  latestCampaignList: Partial<CampaignEntity[]>;
  joinedCampaignList: Partial<CampaignEntity[]>;
  selectedCampaign: Partial<CampaignEntity>;
  onGoingCampaignList: Partial<CampaignEntity[]>;
  completedCampaignList: Partial<CampaignEntity[]>;
  campaignCategories: Partial<CampaignCategoriesEntity[]>;
  campaignName: string;
  campaignDetail: string;
  campaignStart: string;
  campaignEnd: string;
  campaignType: any;
  campaignImageUrl: string;
  campaignUserLimit: any;
  campaignCategoryId: any;
  campaignReward: string;
  userId: any;
  campaignImageObject: any;
  userLimitType: string;
}
