import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import Swiper from "react-native-swiper";

export default function Onbarding() {
  const navigation = useNavigation();
  return (
    <Swiper
      showsPagination={true}
      activeDotStyle={{
        height: 10,
        width: 10,
        backgroundColor: "#30AD4A",
      }}
      paginationStyle={{
        bottom: 70,
      }}
      showsButtons
      prevButton={<Text></Text>}
      nextButton={
        <View className="bg-[#30AD4A] h-16 w-16 rounded-full  text-center flex items-center justify-center mt-[630px]">
          <Text className="text-xl text-white">Next</Text>
        </View>
      }
      loop={false}
    >
      <View className="bg-white h-full w-full ">
        <View className="w-full h-full flex items-center justify-center">
          <View>
            <Text className="text-4xl font-bold text-center">Plant a </Text>
            <Text className="text-4xl font-bold"> Tree For Life</Text>
          </View>
          <Image
            source={require("../../assets/roundedColor.png")}
            className="absolute bottom-36 opacity-70"
          />
          <Image
            source={require("../../assets/plant_pic.png")}
            className="h-96 w-auto object-contain relative"
          />
          <Pressable
            onPress={() => {
              navigation.navigate("signup");
            }}
            className="absolute left-6 top-16 z-20 "
          >
            <Text className="text-lg underline">Skip</Text>
          </Pressable>
        </View>
      </View>
      <View className="bg-white h-full w-full ">
        <View className="w-full h-full flex items-center justify-center">
          <View>
            <Text className="text-4xl font-bold text-center">
              Save the World
            </Text>
            <Text className="text-4xl font-bold text-center">Plant a TREE</Text>
          </View>
          <Image
            source={require("../../assets/roundedColor.png")}
            className="absolute bottom-36 opacity-70"
          />
          <Image
            source={require("../../assets/plant_pic.png")}
            className="h-96 w-auto object-contain relative"
          />
        </View>
      </View>
      <View className="bg-white h-full w-full ">
        <View className="w-full h-full flex items-center justify-center">
          <View>
            <Text className="text-4xl font-bold text-center">
              Save the World{" "}
            </Text>
            <Text className="text-4xl font-bold text-center">Plant a TREE</Text>
          </View>
          <Image
            source={require("../../assets/roundedColor.png")}
            className="absolute bottom-36 opacity-70"
          />
          <Image
            source={require("../../assets/plant_pic.png")}
            className="h-96 w-auto object-contain relative"
          />
          <Pressable
            onPress={() => {
              navigation.navigate("signup");
            }}
            className="bg-[#30AD4A] h-16 w-16 rounded-full  text-center flex items-center justify-center absolute bottom-24 right-3"
          >
            <Text className="text-xl text-white">Done</Text>
          </Pressable>
        </View>
      </View>
    </Swiper>
  );
}
