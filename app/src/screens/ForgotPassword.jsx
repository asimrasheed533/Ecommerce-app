import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import axios from "../utils/axios";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleForgotPassword = async () => {
    try {
      if (email === "") {
        alert("Please enter your email address");
        return;
      }
      setIsLoading(true);
      const res = await axios.post("/user/forgot-pass", { email });
      console.log(res.data);
      navigation.navigate("otp", { otp: res?.data?.otp, email });
    } catch (error) {
      console.warn("Error:", error.response ? error.response.data : error);
      alert(` ${error.response ? error.response.data : error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex flex-row justify-between my-4">
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          className="border-2 rounded-full  h-8 w-8 flex justify-center items-center"
        >
          <Icon.ArrowLeft color={"black"} />
        </Pressable>
      </View>
      <View className="flex-1 flex-col  items-end">
        <View className="w-full my-8">
          <Text className="text-4xl mb-2 text-center">Forgot Password</Text>
          <Text className="px-4 text-gray-500">
            Enter your email address and we will send you a link to reset your
            password
          </Text>
        </View>

        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Pressable
          onPress={handleForgotPassword}
          className="bg-[#30AD4A] h-16 w-full rounded-lg flex items-center justify-center mt-4"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-xl text-white font-bold">Submit</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
