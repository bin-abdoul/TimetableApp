import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { useRouter } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Course {
  _id: string;
  title: string;
  lecturer: string;
  day: string;
  time: string;
  location: string;
}

export default function ReadTimetable() {
  const [timetable, setTimetable] = useState<Course[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    // try {
    //   const res = await fetch("https://your-backend-url.com/api/timetable");
    //   const data = await res.json();
    //   setTimetable(data);
    // } catch (err) {
    //   Alert.alert("Error", "Failed to fetch timetable");
    // }
  };

  const toggleAccordion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleDelete = async (id: string) => {
    // try {
    //   await fetch(`https://your-backend-url.com/api/timetable/${id}`, {
    //     method: "DELETE",
    //   });
    //   setTimetable((prev) => prev.filter((course) => course._id !== id));
    //   Alert.alert("Success", "Course deleted");
    // } catch (err) {
    //   Alert.alert("Error", "Failed to delete course");
    // }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
        My Timetable
      </Text>

      {timetable.map((course, index) => (
        <View key={course._id} className="mb-4 border border-gray-300 rounded-xl">
          <TouchableOpacity
            onPress={() => toggleAccordion(index)}
            className="bg-[#5BBAC9] p-4 rounded-t-xl"
          >
            <Text className="text-white font-semibold text-lg">{course.title}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={activeIndex !== index}>
            <View className="bg-gray-50 p-4 rounded-b-xl">
              <Text className="text-base text-gray-700 mb-1">
                <Text className="font-semibold">Lecturer:</Text> {course.lecturer}
              </Text>
              <Text className="text-base text-gray-700 mb-1">
                <Text className="font-semibold">Day:</Text> {course.day}
              </Text>
              <Text className="text-base text-gray-700 mb-1">
                <Text className="font-semibold">Time:</Text> {course.time}
              </Text>
              <Text className="text-base text-gray-700 mb-3">
                <Text className="font-semibold">Location:</Text> {course.location}
              </Text>

              <View className="flex-row justify-between">
                <TouchableOpacity
                  // onPress={() => router.push(`/updateCourse/${course._id}`)}
                  className="flex-row items-center bg-yellow-500 px-4 py-2 rounded-xl"
                >
                  <Pencil size={18} color="white" />
                  <Text className="text-white font-medium ml-2">Update</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert("Confirm", "Delete this course?", [
                      { text: "Cancel" },
                      { text: "Delete", onPress: () => handleDelete(course._id), style: "destructive" },
                    ])
                  }
                  className="flex-row items-center bg-red-500 px-4 py-2 rounded-xl"
                >
                  <Trash2 size={18} color="white" />
                  <Text className="text-white font-medium ml-2">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
}
