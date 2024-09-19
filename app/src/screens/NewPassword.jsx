import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "../utils/axios";

const NewPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const email = route.params?.email;
  console.log({ email });
  const handleChangePassword = async () => {
    try {
      if (password === "" || confirmPassword === "") {
        alert("Please enter password and confirm password");
        return;
      }
      if (password === confirmPassword) {
        setLoading(true);
        const res = await axios.put(`/user/new-password`, {
          email,
          password,
        });
        console.log(res.data);
      } else {
        alert("Password and Confirm Password do not match");
      }
    } catch (error) {
      console.warn("Error:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-1 flex-col  items-end">
        <View className="w-full my-8">
          <Text className="text-4xl  text-center">New Password</Text>
        </View>

        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
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
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-xl text-white font-bold">Submit</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default NewPassword;
