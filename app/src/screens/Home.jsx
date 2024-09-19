import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import GreenPlants from "../../assets/plant_1.svg";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { cartAtom } from "../data/state";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const navigation = useNavigation();
  const categories = [
    {
      name: "Green Plants",
      image: <GreenPlants height={50} width={50} />,
    },
    {
      name: "Flowers",
      image: <GreenPlants height={50} width={50} />,
    },
    {
      name: "Indoor Plants",
      image: <GreenPlants height={50} width={50} />,
    },
  ];
  const cardData = [
    {
      id: 1,
      name: "Snake Plant",
      price: 13.99,
      image: require("../../assets/plantCard1.png"),
      rating: 4.5,
      reviwes: 178,
      description:
        "Snake plants are native to tropical West Africa, where they grow in dry conditions. They’re often grown as houseplants, but these plants can thrive outdoors in U.S. Department of Agriculture plant hardiness zones 9 to 11. Snake plants are also known as mother-in-law’s tongue and Sansevieria.",
    },
    {
      id: 2,
      name: "Bamboo Plant",
      price: 12.99,
      image: require("../../assets/bamboo.png"),
      rating: 4.4,
      reviwes: 200,
      description:
        "Bamboo plants are a great way to add a natural element to your home or office. They are easy to care for and can be grown indoors or outdoors. Bamboo plants are also known for their ability to purify the air, making them a great choice for anyone looking to improve the air quality in their home or office.",
    },
    {
      id: 3,
      name: "Money Plant",
      price: 13.99,
      image: require("../../assets/money.png"),
      rating: 4.6,
      reviwes: 150,
      description:
        "Money plants are a popular choice for indoor gardens because they are easy to care for and can thrive in a variety of conditions. They are also known for their ability to purify the air, making them a great choice for anyone looking to improve the air quality in their home or office.",
    },
  ];
  const [cart, setCart] = useAtom(cartAtom);
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar style="dark" />
      <ScrollView>
        {/* header */}
        <View className="flex flex-row justify-between pt-8 px-4">
          <View className="flex flex-row gap-1 items-center">
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
              }}
              source={require("../../assets/plant.png")}
            />
            <Text className="text-2xl font-bold">Plants</Text>
          </View>
          <View className="border border-gray-400 rounded-full p-1 flex items-center justify-center">
            <Image source={require("../../assets/profile.png")} />
          </View>
        </View>
        {/* search and notification */}
        <View className="flex flex-row justify-between p-4 items-center">
          <View className="bg-[#F8F8F8] flex-1 flex flex-row items-center rounded-lg px-2">
            <Icon.Search color="#8C8C8C" />
            <TextInput
              placeholderTextColor={"#8C8C8C"}
              placeholder="Search"
              className=" font-semibold ml-2 flex-1 py-4 "
            />
          </View>
          <View className="w-12  flex justify-center items-center ">
            <Icon.Bell color="#30AD4A" strokeWidth={2} />
          </View>
        </View>
        {/* swiper */}
        <View className="h-[25vh]">
          <Swiper
            showsPagination={true}
            activeDotStyle={{
              height: 12,
              width: 12,
              backgroundColor: "#30AD4A",
              borderRadius: 7,
            }}
            loop={false}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#C9EDE0", "#ffffff"]}
              className="h-[70%] mx-4 px-4 py-2 rounded-xl"
            >
              <View className="flex flex-row">
                <View className="w-1/2 flex flex-col gap-2 pt-4 justify-center">
                  <Text className="text-2xl font-bold">
                    Get 30% Off for New User
                  </Text>
                  <Text className="text-[#30AD4A] text-xl">Shop Now</Text>
                </View>
                <View className="w-1/2 relative">
                  <Image
                    source={require("../../assets/pot.png")}
                    className="absolute right-0 top-0"
                    style={{
                      width: 140,
                      height: 140,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#C9EDE0", "#ffffff"]}
              className="h-[70%] mx-4 px-4 py-2 rounded-xl"
            >
              <View className="flex flex-row">
                <View className="w-1/2 flex flex-col gap-2 pt-4 justify-center">
                  <Text className="text-2xl font-bold">
                    Get 30% Off for New User
                  </Text>
                  <Text className="text-[#30AD4A] text-xl">Shop Now</Text>
                </View>
                <View className="w-1/2 relative">
                  <Image
                    source={require("../../assets/pot.png")}
                    className="absolute right-0 top-0"
                    style={{
                      width: 140,
                      height: 140,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#C9EDE0", "#ffffff"]}
              className="h-[70%] mx-4 px-4 py-2 rounded-xl"
            >
              <View className="flex flex-row">
                <View className="w-1/2 flex flex-col gap-2 pt-4 justify-center">
                  <Text className="text-2xl font-bold">
                    Get 30% Off for New User
                  </Text>
                  <Text className="text-[#30AD4A] text-xl">Shop Now</Text>
                </View>
                <View className="w-1/2 relative">
                  <Image
                    source={require("../../assets/pot.png")}
                    className="absolute right-0 top-0"
                    style={{
                      width: 140,
                      height: 140,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
          </Swiper>
        </View>
        {/* categories */}
        <ScrollView
          horizontal={true}
          className="px-4 mb-4 flex flex-row gap-4 w-full"
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category, index) => {
            return (
              <View
                key={category.name}
                className="bg-[#F8F8F8] flex gap-2 p-4 rounded-lg items-center text-black w-[130px]  justify-center"
              >
                {category.image}
                <Text>{category.name}</Text>
              </View>
            );
          })}
        </ScrollView>
        {/* plant cards */}
        <View className="px-4 flex flex-row flex-wrap gap-4 pb-20">
          {cardData.map((card, index) => {
            const [isLiked, setIsLiked] = useState(false);
            return (
              <Pressable
                key={card.name}
                onPress={() =>
                  navigation.navigate("productDetails", { state: card })
                }
                className="bg-[#F8F8F8] rounded-lg w-[45%] relative"
              >
                <Pressable
                  onPress={() => {
                    setIsLiked(!isLiked);
                  }}
                >
                  <Icon.Heart
                    color="#30AD4A"
                    className="right-2 top-2 absolute"
                    fill={isLiked ? "#30AD4A" : "none"}
                  />
                </Pressable>
                <View className=" flex justify-center items-center py-4">
                  <Image source={card.image} />
                </View>
                <LinearGradient
                  colors={["#C9EDE0", "#ffffff"]}
                  className="rounded-lg h-10 flex flex-col justify-center items-center "
                >
                  <Text className="font-bold">{card.name}</Text>
                  <View className="flex flex-row">
                    <Text className="font-bold text-xs">
                      ${card.price.toFixed(2).split(".")[0]}.
                    </Text>
                    <Text
                      className="font-bold text-[8px]"
                      style={{
                        lineHeight: 10,
                      }}
                    >
                      {card.price.toFixed(2).split(".")[1]}
                    </Text>
                  </View>
                </LinearGradient>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
