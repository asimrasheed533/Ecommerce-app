import {
  View,
  Text,
  TextInput,
  Pressable,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const navigation = useNavigation();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const handleSignIn = async () => {
    try {
      if (Email && Password) {
        setIsLoading(true);
        let res = await axios.post("/users/login", {
          email: Email,
          password: Password,
        });
        console.log("user in profile", res.data);
        await AsyncStorage.setItem("user", JSON.stringify(res.data));
        alert("User logged in successfully");
        navigation.navigate("mytabs");
      } else {
        alert("Please fill all the fields");
      }
    } catch (error) {
      alert(error.response ? error.response.data : "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-1 flex-col  items-end">
        <View className="w-full my-8">
          <Text className="text-4xl  text-center">Sign In</Text>
        </View>

        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Email"
          value={Email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-full"
          placeholder="Password"
          value={Password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />

        <Pressable
          onPress={() => {
            navigation.navigate("forgotPassword");
          }}
        >
          <Text className="text-gray-400 underline">Forgot Password?</Text>
        </Pressable>
        <Pressable
          onPress={handleSignIn}
          className="bg-[#30AD4A] h-16 w-full rounded-lg flex items-center justify-center mt-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-xl text-white font-bold">Sign In</Text>
          )}
        </Pressable>

        <View className="flex flex-row justify-center mt-4 w-full">
          <Text>Don't have an account? </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("signup");
            }}
          >
            <Text className="text-[#30AD4A] underline ml-1">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
