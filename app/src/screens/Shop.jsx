import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import * as Icon from "react-native-feather";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useQuery from "../utils/useQuery";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { data: products } = useQuery("/products");
  const categories = ["All", "Outdoor", "Indoor", "Office", "Home"];
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Modal
        visible={filtersOpen}
        animationType="fade"
        onRequestClose={() => {
          setFiltersOpen(false);
        }}
        transparent={true}
      >
        <Pressable
          onPress={() => setFiltersOpen(false)}
          className="bg-[#ffffffd2] flex h-full items-center justify-center "
        >
          <View className="p-4 bg-white border-2 border-[#30AD4A] rounded-xl overflow-hidden w-[90%]">
            <Text className="text-center text-2xl font-bold">Filters</Text>
            <View className={`flex flex-col items-center`}>
              <Text className="my-2">Price Low to High</Text>
              <Text className="my-2">Price High to Low</Text>
              <Text className="my-2">Most Popular </Text>
              <Text className="my-2">Trending</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
      <View>
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
          <Pressable
            onPress={() => setFiltersOpen(!filtersOpen)}
            className="w-12  flex justify-center items-center relative"
          >
            <Icon.Filter color="#30AD4A" strokeWidth={2} />
          </Pressable>
        </View>
        {/* categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row p-4"
        >
          {categories.map((category, index) => (
            <Pressable
              onPress={() => setSelectedCategory(category)}
              key={index}
              className={`px-4 mr-4 py-2 rounded-lg  border border-[#30AD4A] mx-2
               ${
                 selectedCategory === category
                   ? "bg-[#30AD4A] text-white "
                   : "bg-transparent"
               }
          `}
            >
              <Text
                className={`   ${
                  selectedCategory === category ? " text-white " : " "
                }`}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        {/* cards */}
        <View className="px-4 flex flex-row flex-wrap gap-4 pb-20">
          {products?.map((card, index) => (
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
              ></Pressable>
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
      </View>
    </SafeAreaView>
  );
};

export default Shop;
