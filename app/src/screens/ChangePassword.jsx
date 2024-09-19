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
import axios from "../utils/axios";
import { useUser } from "../data/userContext";

const ChangePassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useUser();
  const handleChangePassword = async () => {
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setIsLoading(true);
        try {
          const res = await axios.put(`/user/update-password/${user._id}`, {
            oldPassword,
            password: newPassword,
          });
          alert(res.data);
          navigation.navigate("signin");
        } catch (error) {
          console.log(error);
          alert("An error occurred while changing password");
        } finally {
          setIsLoading(false);
        }
      } else {
        alert("New password and confirm password do not match");
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-1 flex-col  items-end">
        <View className="w-full my-8">
          <Text className="text-4xl  text-center">Change Password</Text>
        </View>

        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={(text) => {
            setOldPassword(text);
          }}
        />
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
          }}
        />
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />

        <Pressable
          onPress={handleChangePassword}
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

export default ChangePassword;
