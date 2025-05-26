import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import {
  CircleUser,
  Mail,
  KeyRound,
  Home,
  Phone,
  Calendar,
} from "lucide-react-native";

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

    console.log("Form submitted:", formData);
    Alert.alert("Success", "Account created!");
    // router.push("/login");
  };

  const updateField = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView className="bg-white">
      <View className="items-end p-5">
        <Image source={require("../assets/images/Logo.png")} resizeMode="contain" />
      </View>
      <View className="bg-white p-6 mt-4">
        <Text className="text-3xl font-bold mb-6">Create Account</Text>
        <View className="justify-between gap-4">
          <View className="flex-1">
            <InputField
              icon={<CircleUser color="gray" />}
              placeholder="First Name"
              value={formData.firstName}
              onChange={(v) => updateField("firstName", v)}
            />
            <InputField
              icon={<CircleUser color="gray" />}
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(v) => updateField("lastName", v)}
            />
            <InputField
              icon={<Mail color="gray" />}
              placeholder="Email Address"
              value={formData.email}
              onChange={(v) => updateField("email", v)}
            />
            <InputField
              icon={<KeyRound color="gray" />}
              placeholder="Password"
              value={formData.password}
              secure
              onChange={(v) => updateField("password", v)}
            />
            <InputField
              icon={<Home color="gray" />}
              placeholder="Address"
              value={formData.address}
              onChange={(v) => updateField("address", v)}
            />
            <InputField
              icon={<Phone color="gray" />}
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(v) => updateField("phone", v)}
            />

            {/* Gender Picker */}
            <View className="border-b border-gray-300 flex-row items-center mt-2">
              <Picker
                selectedValue={formData.gender}
                onValueChange={(val) => updateField("gender", val)}
                style={{ flex: 1 }}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>

            {/* Date of Birth */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="flex-row items-center border-b border-gray-300 py-3 mt-4"
            >
              <Calendar color="gray" size={24} />
              <Text className="ml-3 text-lg text-gray-600">
                {formData.birthdate
                  ? formData.birthdate.toDateString()
                  : "Select Date of Birth"}
              </Text>
            </TouchableOpacity>

            {/* Show Date Picker */}
            {/* {showDatePicker && (
              <DateTimePicker
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                value={formData.birthdate || new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    updateField("birthdate", selectedDate);
                  }
                }}
              />
            )} */}
          </View>
        </View>

        <TouchableOpacity
          disabled={!isFormValid}
          onPress={handleSubmit}
          className={`mt-8 p-4 rounded-2xl ${
            isFormValid ? "bg-[#5BBAC9]" : "bg-gray-400"
          }`}
        >
          <Text className="text-white text-center font-bold text-xl">Create Account</Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity>
            <Link href={"/"}></Link>
            <Text className="text-[#5BBAC9] font-semibold underline">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function InputField({
  icon,
  placeholder,
  value,
  onChange,
  secure = false,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  secure?: boolean;
}) {
  return (
    <View className="flex-row items-center border-b border-gray-300 py-3 mb-2">
      {icon}
      <TextInput
        className="flex-1 ml-3 text-lg"
        placeholder={placeholder}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
