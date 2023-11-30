declare module "@env" {
  export const API_IOS_URL: string;
  export const API_ANDROID_URL: string;
}

declare module "react-native-screens-swiper" {
  import React, { ComponentProps } from "react";
  import { FlatListProps, TextStyle, ViewStyle } from "react-native";

  export interface SwiperDataType {
    tabLabel: string;
    component: React.ReactNode;
    props?: ComponentProps;
  }

  export interface SwiperStyle {
    pillContainer?: ViewStyle;
    pillButton?: ViewStyle;
    pillActive?: ViewStyle;
    pillLabel?: TextStyle;
    activeLabel?: TextStyle;
    borderActive?: ViewStyle;
    pillsOverflow?: ViewStyle;
  }

  export interface SwiperProps extends FlatListProps {
    style?: SwiperStyle;
    data: SwiperDataType[];
    isStaticPills?: boolean;
    stickyHeaderEnabled?: boolean;
    scrollableContainer?: boolean;
    stickyHeaderIndex?: number;
  }

  export default class Swiper extends React.Component<SwiperProps, any> {}
}
