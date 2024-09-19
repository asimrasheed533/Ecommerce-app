import { View, Text, TextInput, Pressable, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";

const OTP = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);
  const otpSent = route.params?.otp;
  const email = route.params?.email;
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
  console.log("OTP:", otpSent);
  console.log({
    otp,
  });
  console.log({ email });
  console.log(otp.reduce((acc, curr) => acc + curr, ""));
  const handleTextChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const reducedOtp = Number.parseInt(otp.reduce((acc, curr) => acc + curr, ""));
  const checkOtp = () => {
    if (reducedOtp === otpSent) {
      console.log("OTP Matched");
      navigation.navigate("newPassword", { email });
    } else {
      console.warn("OTP Not Matched");
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
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
          <Text className="text-4xl mb-2 text-center">OTP</Text>
          <Text className="px-4 text-gray-500 text-center">
            Enter the OTP sent to your email address
          </Text>
        </View>
        <View className="flex flex-row w-full justify-between">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyDown(e, index)}
              maxLength={1}
              keyboardType="numeric"
              className="border-2 text-2xl border-gray-300 rounded-lg p-4 mb-4 w-[20%] text-center"
            />
          ))}
        </View>

        <Pressable
          onPress={checkOtp}
          className="bg-[#30AD4A] h-16 w-full rounded-lg flex items-center justify-center mt-4"
        >
          <Text className="text-xl text-white font-bold">Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OTP;
