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
  campaignList: CampaignEntity[];
  selectedCampaign: CampaignEntity | null;
}
