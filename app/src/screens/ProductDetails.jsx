import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAtom } from "jotai";
import { cartAtom } from "../data/state";
const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const state = route.params.state;
  const [count, setCount] = useState(1);
  const [cart, setCart] = useAtom(cartAtom);
  const addToCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      setCart([...cart, { ...item, count: count, selected: true }]);
    } else {
      const newCart = [...cart];
      newCart[index].count = count;
      newCart[index].selected = true;
      setCart(newCart);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex flex-row justify-between p-4">
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          className="border-2 rounded-full  h-8 w-8 flex justify-center items-center"
        >
          <Icon.ArrowLeft color={"black"} />
        </Pressable>
        <Pressable className=" rounded-full bg-[#30AD4A] h-8 w-8 flex justify-center items-center">
          <Icon.Heart color={"white"} fill={"white"} height={18} />
        </Pressable>
      </View>
      <View>
        <Image
          className="h-64"
          source={{ uri: state.img }}
          style={{
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      {/* <PlantSizeSelector /> */}
      <View className=" bg-[#fafafa] p-4 mt-4 flex flex-col justify-between">
        <View className="flex flex-row justify-between ">
          <View>
            <Text className="text-2xl font-bold">{state.title}</Text>
            <Text className="text-2xl font-bold text-[#30AD4A]">
              ${state.price}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Icon.Star color={"#FFC107"} fill={"#FFC107"} />
            <Text className="text-lg font-semibold mr-2">{state.rating}</Text>
            <Text>({state.reviews} Reviews)</Text>
          </View>
        </View>
        <View className="my-2 ">
          <Text className="tracking-wide">{state.description}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mt-3">
          <View>
            <CartBarCounter count={count} setCount={setCount} />
          </View>
          <View className="w-1/2">
            <Pressable
              onPress={() => {
                addToCart(state);
                navigation.navigate("cart");
              }}
              className="bg-[#30AD4A] h-14 flex items-center justify-center rounded-lg"
            >
              <Text className="text-xl text-white">Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

function PlantSizeSelector() {
  const data = [
    {
      id: 1,
      size: 10,
      price: 11.99,
      img: require("../../assets/potSizePic1.png"),
    },
    {
      id: 2,
      size: 12,
      price: 15.99,
      img: require("../../assets/productDetail.png"),
    },
    {
      id: 3,
      size: 14,
      price: 19.99,
      img: require("../../assets/potSizePic3.png"),
    },
  ];
  const [selectedSize, setSelectedSize] = useState(2);
  return (
    <View
      className={` bg-[#EAF8F3] gap-0 flex flex-row mx-4 mt-8 h-36 items-center justify-center `}
    >
      {data.map((item) => (
        <Pressable
          onPress={() => setSelectedSize(item.id)}
          key={item.id}
          style={{
            borderTopRightRadius: item.id === 1 ? 20 : 0,
            borderBottomRightRadius: item.id === 2 ? 20 : 0,
            borderBottomLeftRadius: item.id === 2 ? 20 : 0,
            borderTopLeftRadius: item.id === 3 ? 20 : 0,
          }}
          className={`w-[32%] h-full flex flex-col items-center justify-center gap-2 
          ${selectedSize === item.id ? "bg-[#30AD4A]" : " bg-[#EAF8F3] "}`}
        >
          <Image
            className="h-20"
            style={{
              width: "100%",
              resizeMode: "contain",
            }}
            source={item.img}
          />
          <Text
            className={`text-center text-inherit font-bold text-base ${
              selectedSize === item.id ? "text-white" : ""
            }`}
          >
            {item.size}” inch
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function CartBarCounter({ count, setCount }) {
  return (
    <View className="flex flex-row items-center gap-2">
      <Pressable className="bg-gray-300 rounded p-1">
        <Icon.Minus
          color={"black"}
          onPress={() => {
            if (count > 1) {
              setCount(count - 1);
            }
          }}
          height={20}
          width={20}
        />
      </Pressable>
      <View className="w-8">
        <Text className="text-2xl text-center">{count}</Text>
      </View>
      <Pressable className="bg-[#30AD4A] rounded p-1">
        <Icon.Plus
          color={"white"}
          onPress={() => setCount(count + 1)}
          height={20}
          width={20}
        />
      </Pressable>
    </View>
  );
}
