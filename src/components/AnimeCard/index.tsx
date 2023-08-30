import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  } from "react-native";

const { width } = Dimensions.get('screen')

const imageW = width * 0.8
const imageH = imageW * 1.54

const getInputRange = (index: number) => {
  return [
    (index - 1) * width,
    index * width,
    (index + 1) * width
  ]
}

const getOpacity = (scrollX: Animated.Value, inputRange: number[]) => {
  return scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0]
  })
}

export interface Anime {
  id: string;
  title: {
    english: string;
  };
  coverImage: {
    color: string;
    extraLarge: string;
  }
}

interface AnimeCardProps {
  anime: Anime;
  index: number;
  scrollX: Animated.Value;
}

export function AnimeCard({ anime, index, scrollX }: AnimeCardProps) {
  const inputRange = getInputRange(index)
  const opacity = getOpacity(scrollX, inputRange)
  
  return (
    <View style={styles.container}>
      <Image source={{uri: anime.coverImage.extraLarge}}
        style={styles.image}
      />

      <Animated.Text
        style={[styles.text, { opacity, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.2)' }]}
      >
        {anime.title.english}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20
  },
  image: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  text: {
    
    fontSize: 32,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 8,
    textTransform: 'uppercase',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});