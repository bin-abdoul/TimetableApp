import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function main() {
  const router = useRouter();
  const [selected, setSelected] = useState("readTimetable");

  const navigate = (page: string) => {
    setSelected(page);
    router.push(`/${page}`);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Stack.Screen options={{ title: "Main Dashboard" }} />

      {/* Page toggler */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
          backgroundColor: "#5BBAC9",
        }}
      >
        {["readTimetable", "addCourse", "signUp"].map((page) => (
          <TouchableOpacity
            key={page}
            onPress={() => navigate(page)}
            style={{
              padding: 10,
              borderBottomWidth: selected === page ? 2 : 0,
              borderBottomColor: "white",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: selected === page ? "bold" : "normal",
                fontSize: 16,
              }}
            >
              {page === "readTimetable"
                ? "Timetable"
                : page === "addCourse"
                ? "Add Course"
                : "Sign Up"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* The routed page will appear below */}
      {/* You can use children or Outlet for nested routing in Expo Router, but for simplicity, each page loads separately */}
    </View>
  );
}
