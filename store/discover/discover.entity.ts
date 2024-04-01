export interface DiscoverEntity {
  discoverId: number;
  discoverName: string;
  discoverDate: string;
  discoverLink: string;
  discoverImage: string;
}

export interface DiscoverState {
  discoverList: Partial<DiscoverEntity[]>;
}
