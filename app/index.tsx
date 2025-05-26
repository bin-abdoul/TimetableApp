import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Mail, KeyRound } from "lucide-react-native";
import "../global.css";


export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "Fill all fields";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Input a valid email";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    try {
      const res = await fetch("https://your-backend-url.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Invalid user credentials");

      const data = await res.json();
      // Save token securely if needed
      Alert.alert("Success", "Login successful");
      router.replace("/main");;
    } catch (err: any) {
      Alert.alert("Login Failed", err.message || "Something went wrong");
    }
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <View className="p-5 items-end">
        <Image source={require("../assets/images/Logo.png")} resizeMode="contain" />
      </View>
      <View className="flex-1 flex-col justify-center bg-white px-6 py-10">
        <Text className="text-3xl font-bold my-10">Sign In</Text>

        <View className="flex-row items-center border-b border-gray-300 mb-5">
          <Mail color="gray" size={24} />
          <TextInput
            className="flex-1 ml-2 text-lg"
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="flex-row items-center border-b border-gray-300 mb-8">
          <KeyRound color="gray" size={24} />
          <TextInput
            className="flex-1 ml-2 text-lg"
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#5BBAC9] rounded-2xl mx-auto py-3 px-6 items-center mb-6"
        >
          <Text className="text-white text-xl font-bold">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500">No Account? </Text>
          <TouchableOpacity onPress={() => router.push("/signUp")}>
            <Text className="text-[#5BBAC9] font-semibold underline">Create One</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}