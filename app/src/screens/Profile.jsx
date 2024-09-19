import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("signin");
  };
  return (
    <SafeAreaView className="bg-[#30AD4A] flex-1">
      <StatusBar style="light" />
      {/* Header */}
      <View className="flex w-full top-14 flex-row justify-center items-center p-4 absolute z-10">
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          className="border-2 border-white rounded-full h-8 w-8 flex justify-center items-center absolute top-4 left-4"
        >
          <Icon.ArrowLeft color={"white"} />
        </Pressable>
        <Text className="text-2xl font-semibold text-white">Profile</Text>
      </View>
      <View className="h-[35%] w-full flex flex-col items-center justify-end">
        <View className="my-2">
          <Text className="text-2xl text-center font-semibold text-white ">
            John Doe
          </Text>
          <Text className="text-lg text-white">+1 234 567 890</Text>
        </View>
      </View>
      <View className="bg-white h-[65%] rounded-t-3xl">
        <View className="flex-1 p-4 flex gap-4">
          <View className="bg-gray-100 rounded-2xl">
            <View className="flex flex-row justify-between items-center p-4 border-b-2 border-gray-300">
              <Text className="font-semibold">Email</Text>
              <Text>ali@gmail.com</Text>
            </View>
            <View className="flex flex-row justify-between items-center p-4">
              <Text className="font-semibold">Phone</Text>
              <Text>+92-3004575442</Text>
            </View>
          </View>
          <View className="bg-gray-100 rounded-2xl ">
            {/* <View className="flex flex-row gap-4 items-center p-4">
              <View>
                <Icon.Lock color={"#30AD4A"} />
              </View>
              <Text className="font-semibold">Change Password</Text>
            </View> */}
          </View>
          <Pressable onPress={logout} className="bg-gray-100 rounded-2xl ">
            <View className="flex flex-row gap-4 items-center p-4">
              <View>
                <Icon.LogOut color={"#30AD4A"} />
              </View>
              <Text className="font-semibold">Log Out</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
