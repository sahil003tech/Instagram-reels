import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import {
  CameraIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";
import { data } from "./data";

const { width, height } = Dimensions.get("window");

export default function App() {
  const video = useRef(null);
  const [currindex, SetCurrindex] = useState(0);

  useEffect(() => {
    if (!video.current) {
      video.current.seek(0);
    }
  }, [currindex]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, height: height }}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: item.videoUrl,
          }}
          resizeMode="cover"
          isLooping
          shouldPlay={currindex == index}
        />

        <View style={styles.bottomView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
              style={styles.profile}
            />
            <Text
              style={{ marginHorizontal: 8, color: "#fff", fontWeight: "bold" }}
            >
              Sahil Alagiya
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "#fff" }}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text numberOfLines={1} style={{ flex: 1, color: "#fff" }}>
                {item.description}
              </Text>
              <TouchableOpacity>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>More</Text>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.flexHorizontal, marginVertical: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <HeartIcon size={30} color="#fff" />
                <ChatBubbleOvalLeftIcon
                  style={{ marginHorizontal: 8 }}
                  size={30}
                  color="#fff"
                />
                <PaperAirplaneIcon size={30} color="#fff" />
                <BookmarkIcon
                  size={30}
                  color="#fff"
                  style={{ marginHorizontal: 8 }}
                />
                <EllipsisHorizontalIcon size={30} color="#fff" />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <HeartIcon size={15} color="#fff" />
                  <Text style={{ marginLeft: 4 }}>94.6K</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ChatBubbleOvalLeftIcon size={15} color="#fff" />
                  <Text style={{ marginLeft: 4 }}>112</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onChangeIndex = ({ index }) => {
    SetCurrindex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SwiperFlatList
        vertical={true}
        renderItem={renderItem}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
      />

      <View style={{ position: "absolute", top: 40, left: 16 }}>
        <Text style={styles.textStyle}>Reels</Text>
      </View>
      <View style={{ position: "absolute", top: 40, right: 16 }}>
        <CameraIcon size={30} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    height: height,
    width: width,
    position: "absolute",
  },
  flexHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 16,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
});
