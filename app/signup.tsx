import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Calendar, CircleUser, Mail, KeyRound, Home, Phone } from "lucide-react-native";

export default function SignUpScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gender: "",
    birthdate: null as Date | null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const isFormValid = Object.values(formData).every((v) => v !== "" && v !== null);

  const updateField = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    Alert.alert("Success", "Account created!");
    // router.push("/login"); // Navigate after signup success if needed
  };

  return (
    <ScrollView className="bg-white p-6">
      <Text className="text-3xl font-bold mb-6">Create Account</Text>

      <InputField
        icon={<CircleUser color="gray" />}
        placeholder="First Name"
        value={formData.firstName}
        onChange={(val) => updateField("firstName", val)}
      />
      <InputField
        icon={<CircleUser color="gray" />}
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(val) => updateField("lastName", val)}
      />
      <InputField
        icon={<Mail color="gray" />}
        placeholder="Email Address"
        value={formData.email}
        onChange={(val) => updateField("email", val)}
        keyboardType="email-address"
      />
      <InputField
        icon={<KeyRound color="gray" />}
        placeholder="Password"
        value={formData.password}
        onChange={(val) => updateField("password", val)}
        secure
      />
      <InputField
        icon={<Home color="gray" />}
        placeholder="Address"
        value={formData.address}
        onChange={(val) => updateField("address", val)}
      />
      <InputField
        icon={<Phone color="gray" />}
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(val) => updateField("phone", val)}
        keyboardType="phone-pad"
      />

      {/* Gender Picker */}
      <View className="border-b border-gray-300 mt-4 mb-4 rounded-md overflow-hidden">
        <Picker
          selectedValue={formData.gender}
          onValueChange={(val) => updateField("gender", val)}
          className="bg-white text-lg"
          itemStyle={{ fontSize: 18 }}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      {/* Birthdate picker button */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="flex-row items-center border-b border-gray-300 py-3"
      >
        <Calendar color="gray" size={24} />
        <Text className="ml-3 text-lg text-gray-600">
          {formData.birthdate
            ? formData.birthdate.toDateString()
            : "Select Date of Birth"}
        </Text>
      </TouchableOpacity>

      {/* TODO: Replace this with your reusable DatePicker modal */}
      {showDatePicker && (
        <View className="mt-4">
          {/* Example placeholder for DatePicker modal */}
          <Text className="text-center text-gray-500 py-6">
            DatePicker modal here
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker(false);
              // For demo: just set today
              updateField("birthdate", new Date());
            }}
            className="bg-[#5BBAC9] rounded-lg py-3"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Set Today as Birthdate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowDatePicker(false)}
            className="mt-3 py-3"
          >
            <Text className="text-center text-[#5BBAC9] font-semibold text-lg">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        disabled={!isFormValid}
        onPress={handleSubmit}
        className={`mt-8 p-4 rounded-2xl ${
          isFormValid ? "bg-[#5BBAC9]" : "bg-gray-400"
        }`}
      >
        <Text className="text-white text-center font-bold text-xl">Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InputField({
  icon,
  placeholder,
  value,
  onChange,
  secure = false,
  keyboardType = "default",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  secure?: boolean;
  keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
}) {
  return (
    <View className="flex-row items-center border-b border-gray-300 py-3 mb-3">
      {icon}
      <TextInput
        className="flex-1 ml-3 text-lg"
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />
    </View>
  );
}
