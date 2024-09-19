import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { cartAtom } from "../data/state";

const Checkout = () => {
  const navigation = useNavigation();
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [cart, setCart] = useAtom(cartAtom);
  const subTotal = cart
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price * item.count, 0);
  const deliveryCharge = cart.some((item) => item.selected) ? 2.49 : 0;
  const total = subTotal + deliveryCharge;

  return (
    <SafeAreaView className="bg-white flex-1">
      <Modal
        visible={showAddressPopup}
        animationType="slide"
        onRequestClose={() => {
          setShowAddressPopup(false);
        }}
        transparent={true}
      >
        <View className="bg-[#ffffffd2] flex h-full items-center justify-center ">
          <View className="bg-white border-2 border-[#30AD4A] rounded-xl overflow-hidden w-[90%]">
            <View className="flex  bg-white flex-col justify-between p-4">
              <View className="flex-row justify-between">
                <Text className="text-2xl font-semibold mb-4">Add Address</Text>
                <Pressable
                  onPress={() => {
                    setShowAddressPopup(false);
                  }}
                  className="bg-[#30AD4A] h-8 w-8 rounded-full flex justify-center items-center"
                >
                  <Icon.X color={"white"} />
                </Pressable>
              </View>
              <TextInput
                placeholder="Name"
                className="w-full border-b-2 mb-2 py-2 transition-all delay-200 focus:border-[#30AD4A]"
                value={data.name}
                onChangeText={(text) => {
                  setData({ ...data, name: text });
                }}
              />
              <TextInput
                placeholder="Address"
                className="w-full border-b-2 mb-2 py-2 transition-all delay-200 focus:border-[#30AD4A]"
                value={data.address}
                onChangeText={(text) => {
                  setData({ ...data, address: text });
                }}
              />
              <TextInput
                placeholder="Phone"
                className="w-full border-b-2 mb-2 py-2 transition-all delay-200 focus:border-[#30AD4A]"
                value={data.phone}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setData({ ...data, phone: text });
                }}
              />
              <Pressable
                onPress={() => {
                  setShowAddressPopup(false);
                }}
                className="bg-[#30AD4A] mt-4 h-14 flex items-center justify-center rounded-lg"
              >
                <Text className="text-xl text-white">Save Address</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View className="flex flex-row justify-center items-center p-4 relative">
        <Pressable
          onPress={() => {
            if (step === 1) {
              navigation.goBack();
            } else if (step === 2) {
              setStep(1);
            } else if (step === 3) {
              setStep(2);
            }
          }}
          className="border-2 rounded-full h-8 w-8 flex justify-center items-center absolute top-4 left-4"
        >
          <Icon.ArrowLeft color={"black"} />
        </Pressable>
        <Text className="text-2xl font-semibold">Your Order</Text>
      </View>
      <Steps activeStep={step} />
      {step === 1 ? (
        <>
          <View className="flex-row gap-4 px-4 mb-1 h-44">
            {data.name && data.address && data.phone ? (
              <View className="w-[70%]  ">
                <View className="border-2 border-[#30AD4A] h-full rounded-xl p-4 bg-[#F3FCF5]">
                  <View>
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-lg font-semibold">Address</Text>
                      <Icon.CheckCircle color={"#30AD4A"} />
                    </View>
                    <Text>{data.name}</Text>
                    <Text>{data.address}</Text>
                    <Text>{data.phone}</Text>
                  </View>
                </View>
              </View>
            ) : null}
            <View className="flex-1">
              <Pressable
                onPress={() => {
                  setShowAddressPopup(true);
                }}
                className="border-2 h-full rounded-xl flex items-center justify-center"
              >
                <Icon.Plus
                  color={"black"}
                  height={40}
                  width={40}
                  strokeWidth={1.5}
                />
                {!data.name && !data.address && !data.phone ? (
                  <Text>Add Address</Text>
                ) : null}
              </Pressable>
            </View>
          </View>
          <ScrollView className="py-4 flex-1">
            {cart.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  item={item}
                  cart={cart}
                  setCart={setCart}
                />
              );
            })}
          </ScrollView>
        </>
      ) : step === 2 ? (
        <View className="flex-1">
          <Text className="text-xl font-bold px-4 my-4">
            Enter Payment Details
          </Text>
          <View className="mx-4">
            <TextInput
              placeholder="Name on Card"
              className="border-b-2 mb-2 py-2 transition-all delay-200 focus:border-[#30AD4A]"
              keyboardType="default"
            />
            <TextInput
              placeholder="Card Number"
              className="border-b-2 mb-2 py-2 transition-all delay-200 focus:border-[#30AD4A]"
              keyboardType="numeric"
            />
            <View className="flex-row gap-2">
              <TextInput
                placeholder="Expiry Date"
                className="flex-1 border-b-2 mb-2 py-2 mx-4 transition-all delay-200 focus:border-[#30AD4A] "
                keyboardType="numeric"
              />
              <TextInput
                placeholder="CVV"
                className="flex-1 border-b-2 mb-2 py-2 transition-all delay-200 focus:border-[#30AD4A]"
                type="password"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      ) : step === 3 ? (
        <View className="flex-1 p-4 flex justify-center">
          <View className="bg-[#F5F5F5] flex-col  p-6 px-10 w-fit rounded-lg">
            <View className="flex items-center justify-center">
              <Icon.CheckCircle color={"#30AD4A"} height={100} width={100} />
            </View>
            <View>
              <Text className="text-center font-semibold text-2xl text-[#30AD4A] mb-4">
                Payment Successful
              </Text>
              <View className="flex-row justify-between my-2">
                <Text className="font-bold">Transaction Number :</Text>
                <Text>988EV32DD4C</Text>
              </View>
            </View>
            <View className="h-[1px] border-b border-dashed my-2"></View>
            <View className="flex-col">
              <View className="flex-row justify-between my-2">
                <Text className="font-bold">Amound Paid :</Text>
                <Text>$41.99</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold">Paid By :</Text>
                <Text>bKash</Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {step !== 3 ? (
        <View className="p-4 border-y-2 border-gray-200">
          <View className="flex-row justify-between">
            <Text className="font-medium text-lg">Item Total</Text>
            <Text className="font-medium text-lg">2.99</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-medium text-lg">Delivery Charge</Text>
            <Text className="font-medium text-lg">47.49</Text>
          </View>
        </View>
      ) : null}
      <View className="flex flex-row justify-between items-center my-4 px-4">
        {step !== 3 ? (
          <View>
            <Text className="text-[#30AD4A] text-2xl font-bold">$49.99</Text>
            <Text className="text-md">Items Selected: 2</Text>
          </View>
        ) : null}
        <View className={`${step === 3 ? "w-full" : "w-1/2"}`}>
          <Pressable
            onPress={() => {
              if (step === 1) {
                setStep(2);
              } else if (step === 2) {
                setStep(3);
              } else if (step === 3) {
                navigation.navigate("Home");
              }
            }}
            className="bg-[#30AD4A] h-14 flex items-center justify-center rounded-lg"
          >
            <Text className="text-xl text-white">
              {step === 1
                ? "Make Payment"
                : step === 2
                ? "Pay Now"
                : "Back to Home"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

function CartItem({ item, cart, setCart }) {
  return (
    <View className="border border-gray-200 flex flex-row items-center mx-4 h-32 mb-4 rounded">
      <View className="bg-[#F8F8F8] rounded-lg w-36 h-full flex justify-center items-center">
        <Image
          className="h-20"
          source={item.image}
          style={{
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View className="flex-col justify-evenly  h-full ml-4 py-2 w-[40%] ">
        <Text className="text-lg max-w-full font-semibold">{item.name}</Text>
        <Text className="text-lg font-semibold">${item.price}</Text>
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-1">
            <Icon.Star color={"#FFC107"} fill={"#FFC107"} />
            <Text className="">{item.rating}</Text>
          </View>
        </View>
      </View>
      <View className="h-full flex  flex-1 items-end px-2  py-2 justify-end">
        <Text className="text-2xl text-[#30AD4A] font-bold">x{item.count}</Text>
      </View>
    </View>
  );
}

function Steps({ activeStep }) {
  return (
    <View className="px-14 flex-row items-center my-4">
      <View
        className={`h-6 w-6 rounded-full flex justify-center items-center ${
          activeStep >= 1 ? "bg-black" : "bg-gray-300"
        }`}
      >
        <Text className={`text-white font-bold `}>1</Text>
      </View>
      <View
        className={`flex-1 h-[1px] bg-gray-300 ${
          activeStep >= 2 ? "bg-black" : ""
        }`}
      ></View>
      <View
        className={`h-6 w-6 rounded-full flex justify-center items-center ${
          activeStep >= 2 ? "bg-black" : "bg-gray-300"
        }`}
      >
        <Text className={`text-white font-bold `}>2</Text>
      </View>
      <View
        className={`flex-1 h-[1px] bg-gray-300 ${
          activeStep >= 3 ? "bg-black" : ""
        }`}
      ></View>
      <View
        className={`h-6 w-6 rounded-full flex justify-center items-center ${
          activeStep >= 3 ? "bg-black" : "bg-gray-300"
        }`}
      >
        <Text className={`text-white font-bold `}>3</Text>
      </View>
    </View>
  );
}
