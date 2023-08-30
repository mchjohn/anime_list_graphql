import { Animated, StyleSheet } from "react-native";

interface BGImageProps {
  opacity: Animated.AnimatedInterpolation<string | number>;
  imageUrl: string;
}

export function BGImage({ opacity, imageUrl }: BGImageProps) {
  return (
    <Animated.Image
      source={{uri: imageUrl}}
      style={[
        StyleSheet.absoluteFillObject,
        { opacity }
      ]}
      blurRadius={8}
    />
  )
}
