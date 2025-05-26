import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

const tabs = [
  { key: "readTimetable", label: "Timetable" },
  { key: "addCourse", label: "Add Course" },
  { key: "signUp", label: "Sign Up" },
];

export default function MainScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState("readTimetable");

  const navigate = (page: string) => {
    setSelected(page);
    router.push(`/${page}`);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: "Main Dashboard" }} />

      <View className="flex-row justify-around py-3 bg-[#5BBAC9]">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => navigate(tab.key)}
            className={`pb-2 ${
              selected === tab.key ? "border-b-2 border-white" : ""
            }`}
          >
            <Text
              className={`text-white text-base ${
                selected === tab.key ? "font-bold" : "font-normal"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
