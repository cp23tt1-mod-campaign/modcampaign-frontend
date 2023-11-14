export interface CampaignEntity {
  id: number;
  name: string;
  description: string;
  start: Date;
  end: Date;
  type: string;
  userLimit: number;
  category: string;
  categoryTarget: string;
}

export interface CampaignState {
  latestCampaignList: Partial<CampaignEntity[]>;
  popularCampaignList: Partial<CampaignEntity[]>;
  joinedCampaignList: Partial<CampaignEntity[]>;
  selectedCampaign: CampaignEntity | null;
}
