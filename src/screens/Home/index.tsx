import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRef } from "react";
import { useQuery } from "@apollo/client";

import { GET_ANIMES } from "../../graphql/queries";

import { BGImage } from "../../components/BGImage";
import { Anime, AnimeCard } from "../../components/AnimeCard";

const { width } = Dimensions.get('screen')

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

interface QueryResponse {
  Page: {
    media: Anime[]
  }
}

export function Home() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { data, loading } = useQuery<QueryResponse>(GET_ANIMES)

  if (loading) return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size='large' color='blue' />
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={[StyleSheet.absoluteFillObject]}>
        {data?.Page.media.map((anime, index) => {
          const inputRange = getInputRange(index)
          const opacity = getOpacity(scrollX, inputRange)

          return (
            <BGImage
              key={`image-${index}`}
              opacity={opacity}
              imageUrl={anime.coverImage.extraLarge}
            />
          )
        })}
      </View>

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: {contentOffset: { x: scrollX }} }],
          { useNativeDriver: true }
        )}
          data={data?.Page?.media}
          renderItem={({ item, index }) => <AnimeCard anime={item} index={index} scrollX={scrollX} />}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
      />
    </View>
  )
}
