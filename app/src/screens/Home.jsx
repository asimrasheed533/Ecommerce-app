import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import GreenPlants from "../../assets/plant_1.svg";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { cartAtom } from "../data/state";
import { StatusBar } from "expo-status-bar";
import useQuery from "../utils/useQuery";
const Home = () => {
  const navigation = useNavigation();
  const [likedItems, setLikedItems] = useState([]);
  const handleLikeToggle = (index) => {
    const newLikedItems = [...likedItems];
    newLikedItems[index] = !newLikedItems[index];
    setLikedItems(newLikedItems);
  };
  const { data: products } = useQuery("/products");
  const { data: categories } = useQuery("/categories");
  // console.log("products", products);
  // const categories = [
  //   {
  //     name: "Green Plants",
  //     image: <GreenPlants height={50} width={50} />,
  //   },
  //   {
  //     name: "Flowers",
  //     image: <GreenPlants height={50} width={50} />,
  //   },
  //   {
  //     name: "Indoor Plants",
  //     image: <GreenPlants height={50} width={50} />,
  //   },
  // ];

  const [cart, setCart] = useAtom(cartAtom);
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar style="dark" />
      <ScrollView>
        {/* header */}
        <View className="flex flex-row justify-between pt-8 px-4">
          <View className="flex flex-row gap-1 items-center">
            <Image
              source={require("../../assets/e-logo.jpg")}
              style={{
                width: 40,
                height: 40,
              }}
            />

            <Text className="text-2xl font-bold">Ali Express</Text>
          </View>
          <Pressable className="border border-gray-400 rounded-full p-1 flex items-center justify-center">
            <Image source={require("../../assets/profile.png")} />
          </Pressable>
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
          {/* <View className="w-12  flex justify-center items-center ">
            <Icon.Bell color="#30AD4A" strokeWidth={2} />
          </View> */}
        </View>
        {/* swiper */}
        <View className="h-[25vh] ">
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
                    source={require("../../assets/beauty.jpg")}
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
                    source={require("../../assets/pro-1.jpg")}
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
                    source={require("../../assets/med.jpg")}
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
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Category
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          className="px-4 mb-4 flex flex-row gap-4 w-full"
          showsHorizontalScrollIndicator={false}
        >
          {categories?.map((category, index) => {
            return (
              <View
                key={category.name}
                className="bg-[#F8F8F8] flex gap-2 rounded-lg items-center text-black w-[100px]  justify-center"
              >
                <Image
                  source={{ uri: category.img }}
                  style={{ width: 60, height: 60, borderRadius: 90 }}
                />
                <Text>{category.name}</Text>
              </View>
            );
          })}
        </ScrollView>
        {/* plant cards */}
        <View
          style={{
            width: "100%",
            display: "flex",
            margin: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Best Sales
          </Text>
        </View>
        <View className="px-4 flex flex-row flex-wrap gap-4 pb-20">
          {products
            ?.filter((card) => card.type === "featured")
            ?.map((card, index) => (
              <Pressable
                key={card.id}
                onPress={() =>
                  navigation.navigate("productDetails", { state: card })
                }
                className="bg-[#F8F8F8] rounded-lg w-[45%] relative"
              >
                <Pressable
                  onPress={() => handleLikeToggle(index)}
                  className="absolute right-2 top-2"
                >
                  <Icon.Heart
                    color="#30AD4A"
                    fill={likedItems[index] ? "#30AD4A" : "none"}
                  />
                </Pressable>
                <View className="flex justify-center items-center py-4">
                  <Image
                    source={{ uri: card.img }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <LinearGradient
                  colors={["#C9EDE0", "#ffffff"]}
                  className="rounded-lg h-10 flex flex-col justify-center items-center "
                >
                  <Text className="font-bold">{card.title}</Text>
                  <View className="flex flex-row">
                    <Text className="font-bold text-xs">${card.price}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
