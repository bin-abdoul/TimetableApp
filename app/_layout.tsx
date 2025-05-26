import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter, Slot } from "expo-router";

export default function MainLayout() {
  const router = useRouter();
  const [selected, setSelected] = useState("readTimetable");

  const navigate = (page: string) => {
    setSelected(page);
    router.push(page as "/readTimetable" | "/addCourse" | "/signUp");
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

      {/* Render child route here */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </View>
  );
}
