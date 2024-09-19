import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onbarding from "./src/screens/Onboarding";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icon from "react-native-feather";
import ProductDetails from "./src/screens/ProductDetails";
import CartScreen from "./src/screens/CartScreen";
import Checkout from "./src/screens/Checkout";
import Profile from "./src/screens/Profile";
import Shop from "./src/screens/Shop";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/Sign In";
import ForgotPassword from "./src/screens/ForgotPassword";
import OTP from "./src/screens/OTP";
import NewPassword from "./src/screens/NewPassword";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import ChangePassword from "./src/screens/ChangePassword";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      let user = await AsyncStorage.getItem("user");

      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#30AD4A" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="/" component={isLoggedin ? MyTabs : Onbarding} />
        <Stack.Screen name="mytabs" component={MyTabs} />
        <Stack.Screen name="productDetails" component={ProductDetails} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="checkout" component={Checkout} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="signin" component={SignIn} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="otp" component={OTP} />
        <Stack.Screen name="newPassword" component={NewPassword} />
        <Stack.Screen name="changePassword" component={ChangePassword} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#30AD4A",
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          position: "absolute",
          marginHorizontal: 10,
        },
      }}
      tabBarLabelStyle={{
        fontSize: 12,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon.Home
              color={color}
              size={size}
              fill={focused ? "white" : "none"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon.ShoppingCart
              color={color}
              size={size}
              fill={focused ? "white" : "none"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon.User
              color={color}
              size={size}
              fill={focused ? "white" : "none"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
