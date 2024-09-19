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

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (email && password && firstName && confirmPassword) {
      if (password === confirmPassword) {
        setLoading(true);
        axios
          .post("/users/register", {
            email: email,
            password: password,
            name: firstName,
          })
          .then((response) => {
            console.log(response.data);
            alert("User registered successfully");
            navigation.navigate("signin");
          })
          .catch((error) => {
            alert("An error occurred while registering user");
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
            setEmail("");
            setPassword("");
            setFirstName("");

            setConfirmPassword("");
          });
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-1 flex-col  items-end">
        <View className="w-full my-8">
          <Text className="text-4xl  text-center">Sign Up</Text>
        </View>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Full Name"
          value={firstName}
          onChangeText={(value) => {
            setFirstName(value);
          }}
        />

        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
        />
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(value) => {
            setConfirmPassword(value);
          }}
        />

        <Pressable
          onPress={handleSubmit}
          className="bg-[#30AD4A] h-16 w-full rounded-lg flex items-center justify-center mt-4"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-xl text-white font-bold">Sign Up</Text>
          )}
        </Pressable>

        <View className="flex flex-row justify-center mt-4 w-full">
          <Text>Already have an account? </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("signin");
            }}
          >
            <Text className="text-[#30AD4A] underline ml-1">Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
