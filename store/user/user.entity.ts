export interface UserEntity {
  userId: any;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  profileImage: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: number;
  bmr: number;
  role: string;
  [key: string]: any;
}
export interface DietaryEntity {
  food: {
    calories: number;
    carb: number;
    protien: number;
    fat: number;
  };
  exercise: {
    cal: number;
  };
  water: {
    lit: number;
  };
}
// // export interface CreateCampaignEntity {
// //   campaignName: string;
// //   campaignDetail: string;
// //   campaignStart: string;
// //   campaignEnd: string;
// //   campaignType: string;
// //   campaignImageUrl: string;
// //   campaignUserLimit: number;
// //   campaignCategoryId: number;
// //   campaignReward: string;
// //   userId: number;
// // }
// export interface CampaignCategoriesEntity {
//   campaignCategoryId: number;
//   categoryName: string;
//   categoryTarget: string;
// }

export interface UserState {
  userProfile: UserEntity;
  dietary: DietaryEntity;
  remainCalories: number;
  clonedUserProfile: Object;
  stepsValue: string;
  // ownedCampaignList: Partial<CampaignEntity[]>;
  // popularCampaignList: Partial<CampaignEntity[]>;
  // latestCampaignList: Partial<CampaignEntity[]>;
  // joinedCampaignList: Partial<CampaignEntity[]>;
  // selectedCampaign: Partial<CampaignEntity>;
  // onGoingCampaignList: Partial<CampaignEntity[]>;
  // completedCampaignList: Partial<CampaignEntity[]>;
  // campaignCategories: Partial<CampaignCategoriesEntity[]>;
  // campaignName: string;
  // campaignDetail: string;
  // campaignStart: string;
  // campaignEnd: string;
  // campaignType: any;
  // campaignImageUrl: string;
  // campaignUserLimit: any;
  // campaignCategoryId: any;
  // campaignReward: string;
  // userId: any;
  // campaignImageObject: any;
  // userLimitType: string;
  // isConnectThirdParty: boolean;
  // isLoading: boolean;
}
