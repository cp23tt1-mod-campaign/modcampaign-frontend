import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
// import * as Icon from "@expo/vector-icons";

export const UtilIcon = (props: {
  category?: string;
  // name: React.ComponentProps<typeof MaterialIcons>["name"];
  name: any;
  color?: string;
  size?: number;
  className?: string;
}) => {
  if (props.category === "AntDesign") {
    return <AntDesign {...props} className={props.className} />;
  } else if (props.category === "Entypo") {
    return <Entypo {...props} className={props.className} />;
  } else if (props.category === "EvilIcons") {
    return <EvilIcons {...props} className={props.className} />;
  } else if (props.category === "Feather") {
    return <Feather {...props} className={props.className} />;
  } else if (props.category === "FontAwesome") {
    return <FontAwesome {...props} className={props.className} />;
  } else if (props.category === "FontAwesome5") {
    return <FontAwesome5 {...props} className={props.className} />;
  } else if (props.category === "Fontisto") {
    return <Fontisto {...props} className={props.className} />;
  } else if (props.category === "Foundation") {
    return <Foundation {...props} className={props.className} />;
  } else if (props.category === "Ionicons") {
    return <Ionicons {...props} className={props.className} />;
  } else if (props.category === "MaterialCommunityIcons") {
    return <MaterialCommunityIcons {...props} className={props.className} />;
  } else if (props.category === "MaterialIcons") {
    return <MaterialIcons {...props} className={props.className} />;
  } else if (props.category === "Octicons") {
    return <Octicons {...props} className={props.className} />;
  } else if (props.category === "SimpleLineIcons") {
    return <SimpleLineIcons {...props} className={props.className} />;
  } else {
    return <Zocial {...props} className={props.className} />;
  }
  // return <MaterialIcons {...props} className={props.className} />;
};
