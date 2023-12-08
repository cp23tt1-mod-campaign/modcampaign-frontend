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

export interface CampaignState {
  ownedCampaignList: Partial<CampaignEntity[]>;
  popularCampaignList: Partial<CampaignEntity[]>;
  latestCampaignList: Partial<CampaignEntity[]>;
  joinedCampaignList: Partial<CampaignEntity[]>;
  selectedCampaign: Partial<CampaignEntity>;
  onGoingCampaignList: Partial<CampaignEntity[]>;
  completedCampaignList: Partial<CampaignEntity[]>;
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
