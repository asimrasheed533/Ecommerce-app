import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { cartAtom } from "../data/state";

const CartScreen = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useAtom(cartAtom);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const subTotal = cart
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price * item.count, 0);
  const deliveryCharge = cart.some((item) => item.selected) ? 2.49 : 0;
  const total = subTotal + deliveryCharge;

  return (
    <SafeAreaView className="bg-white flex-1">
      <Modal
        visible={showDeletePopup}
        animationType="slide"
        onRequestClose={() => {
          setShowDeletePopup(false);
        }}
        transparent={true}
      >
        <View className="bg-[#ffffffd2] flex h-full items-center justify-center ">
          <View className="bg-white border-2 border-[#30AD4A] rounded-xl overflow-hidden w-[90%]">
            <View className="p-4 flex flex-col items-center">
              <Text className="text-2xl font-semibold">Delete Cart</Text>
              <Text className="text-lg text-center mt-2">
                Are you sure you want to delete all items from cart?
              </Text>
              <View className="flex flex-row gap-4 mt-2">
                <Pressable
                  onPress={() => {
                    setShowDeletePopup(false);
                  }}
                  className="bg-[#30AD4A] h-12 w-24 flex items-center justify-center rounded-lg"
                >
                  <Text className="text-xl text-white">No</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowDeletePopup(false);
                    setTimeout(() => {
                      setCart([]);
                    }, 250);
                    setTimeout(() => {
                      navigation.goBack();
                    }, 500);
                  }}
                  className="bg-red-500 h-12 w-24 flex items-center justify-center rounded-lg"
                >
                  <Text className="text-xl text-white">Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Header */}
      <View className="flex flex-row justify-center items-center p-4 relative  border-b border-gray-300">
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          className="border-2 rounded-full h-8 w-8 flex justify-center items-center absolute top-4 left-4"
        >
          <Icon.ArrowLeft color={"black"} />
        </Pressable>
        <Text className="text-2xl font-semibold">Your Order</Text>
        <Pressable
          onPress={() => {
            setShowDeletePopup(true);
          }}
          className="border-2 border-red-500 rounded-full h-8 w-8 flex justify-center items-center absolute top-4 right-4 bg-red-500 "
        >
          <Icon.Trash color={"white"} />
        </Pressable>
      </View>
      <ScrollView className="py-4 flex-1 ">
        {cart.map((item, index) => {
          return (
            <CartItem key={index} item={item} cart={cart} setCart={setCart} />
          );
        })}
      </ScrollView>
      <View className="p-4 border-y-2 border-gray-200">
        <View className="flex-row justify-between">
          <Text className="font-medium text-lg">Item Total</Text>
          <Text className="font-medium text-lg">${subTotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-medium text-lg">Delivery Charge</Text>
          <Text className="font-medium text-lg">{deliveryCharge}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center my-4 px-4">
        <View>
          <Text className="text-[#30AD4A] text-2xl font-bold">
            ${total.toFixed(2)}
          </Text>
          <Text className="text-md">
            Items Selected:{" "}
            {cart.reduce((acc, item) => {
              if (item.selected) {
                return acc + 1;
              }
              return acc;
            }, 0)}
          </Text>
        </View>
        <View className="w-1/2">
          <Pressable
            onPress={() => {
              navigation.navigate("checkout");
            }}
            className="bg-[#30AD4A] h-14 flex items-center justify-center rounded-lg"
          >
            <Text className="text-xl text-white">Order Now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

function CartBarCounter({ item, cart, setCart }) {
  return (
    <View className="flex-row  rounded-full bg-[#dbdbdb] px-2">
      <Pressable className=" flex justify-center items-center ">
        <Icon.Minus
          color={"black"}
          onPress={() => {
            if (item.count > 1) {
              setCart(
                cart.map((cartItem) => {
                  if (cartItem.id === item.id) {
                    return { ...cartItem, count: cartItem.count - 1 };
                  }
                  return cartItem;
                })
              );
            }
          }}
          width={16}
        />
      </Pressable>
      <View className="w-12 mx-1 bg-[#30AD4A] rounded-full flex justify-center items-center">
        <Text className="font-bold text-center text-white ">{item.count}</Text>
      </View>
      <Pressable className=" flex justify-center items-center">
        <Icon.Plus
          width={16}
          color={"black"}
          onPress={() => {
            setCart(
              cart.map((cartItem) => {
                if (cartItem.id === item.id) {
                  return { ...cartItem, count: cartItem.count + 1 };
                }
                return cartItem;
              })
            );
          }}
        />
      </Pressable>
    </View>
  );
}

function CartItem({ item, cart, setCart }) {
  return (
    <Pressable
      onPress={() => {
        setCart(
          cart.map((cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, selected: !cartItem.selected };
            }
            return cartItem;
          })
        );
      }}
      className="flex flex-row justify-between items-center px-4 h-32 mb-4"
    >
      <View className="h-6 w-6 border-2 border-[#30AD4A] rounded-full overflow-hidden p-[1.5px]">
        {item.selected ? (
          <View className="h-full w-full bg-[#30AD4A] rounded-full"></View>
        ) : null}
      </View>
      <View className="bg-[#F8F8F8] rounded-lg flex-1 mx-2 h-full flex justify-center items-center">
        <Image
          className="h-20"
          source={item.image}
          style={{
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View className="flex-col justify-between h-full w-[50%]">
        <Text className="text-lg max-w-full font-semibold">{item.name}</Text>
        <Text className="text-lg font-semibold">${item.price}</Text>
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-1">
            <Icon.Star color={"#FFC107"} fill={"#FFC107"} />
            <Text className="">{item.rating}</Text>
          </View>
          <CartBarCounter item={item} cart={cart} setCart={setCart} />
        </View>
      </View>
    </Pressable>
  );
}
