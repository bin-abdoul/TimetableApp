import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Star } from "lucide-react-native";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timetableData = [
  {
    day: "Wednesday",
    timeSlot: "10:00AM -- 12:00PM",
    courseCode: "MTH102",
    courseTitle: "Linear Algebra",
    lecturer: "Prof. Jane",
    venue: "Room B",
    creditUnit: "1",
    id: "id",
  },
  // Add more course objects as needed
];

export default function ReadTimetable() {
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  // Toggle expand/collapse for a day
  const toggleDay = (day: string) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Get all courses for a specific day
  const getCoursesForDay = (day: string) =>
    timetableData.filter((course) => course.day === day);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {days.map((day) => {
        const isExpanded = expandedDays.includes(day);
        const courses = getCoursesForDay(day);

        return (
          <View key={day} className="mb-4 border rounded-lg overflow-hidden">
            <TouchableOpacity
              onPress={() => toggleDay(day)}
              className="bg-gray-200 px-4 py-3"
            >
              <Text className="text-xl font-bold">{day}</Text>
            </TouchableOpacity>

            {isExpanded && (
              <View className="bg-white px-4 py-3 border-t">
                {courses.length === 0 ? (
                  <Text className="text-gray-500 italic">No classes</Text>
                ) : (
                  courses.map((course) => (
                    <CourseData key={course.id} {...course} onPress={() => {}} />
                  ))
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const CourseData = ({
  courseCode,
  courseTitle,
  lecturer,
  venue,
  creditUnit,
  onPress,
}: {
  courseCode: string;
  courseTitle: string;
  lecturer: string;
  venue: string;
  creditUnit: string;
  onPress: () => void;
}) => (
  <View className="border p-3 mb-3 rounded shadow-sm">
    <Text className="text-lg text-blue-600 font-bold">
      {courseCode} ({creditUnit} unit)
      <Star color="orange" fill="red" size={16} />
    </Text>
    <Text className="text-sm text-red-900">{courseTitle}</Text>
    <Text className="text-green-800">{lecturer}</Text>
    <Text className="text-sky-500">{venue}</Text>
  </View>
);
