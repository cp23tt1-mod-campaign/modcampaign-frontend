import { useWindowDimensions } from "react-native";

const screenDimension = useWindowDimensions();

export const SCREEN_WIDTH = screenDimension.width;
export const SCREEN_HEIGHT = screenDimension.height;
