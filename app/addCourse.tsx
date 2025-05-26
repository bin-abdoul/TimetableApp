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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import { CalendarClock, MapPin, User, Book } from "lucide-react-native";

export default function AddCourseScreen() {
  const router = useRouter();

  const [courseData, setCourseData] = useState({
    courseName: "",
    lecturer: "",
    venue: "",
    day: "",
    startTime: null as Date | null,
    endTime: null as Date | null,
  });

  const [pickerMode, setPickerMode] = useState<"start" | "end" | null>(null);

  const updateField = (key: keyof typeof courseData, value: any) => {
    setCourseData((prev) => ({ ...prev, [key]: value }));
  };

  const isFormValid = Object.values(courseData).every(
    (v) => v !== "" && v !== null
  );

  const handleSubmit = () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    console.log("Course added:", courseData);
    Alert.alert("Success", "Course added!");
    // router.push("/main"); // Optional redirect
  };

  return (
    <ScrollView className="bg-white px-6 pt-10">
      <Text className="text-3xl font-bold mb-6">Add Course</Text>

      <InputField
        icon={<Book color="gray" />}
        placeholder="Course Name"
        value={courseData.courseName}
        onChange={(val) => updateField("courseName", val)}
      />
      <InputField
        icon={<User color="gray" />}
        placeholder="Lecturer Name"
        value={courseData.lecturer}
        onChange={(val) => updateField("lecturer", val)}
      />
      <InputField
        icon={<MapPin color="gray" />}
        placeholder="Venue"
        value={courseData.venue}
        onChange={(val) => updateField("venue", val)}
      />

      {/* Day Picker */}
      <View className="border-b border-gray-300 flex-row items-center py-3 mt-2">
        <Picker
          selectedValue={courseData.day}
          onValueChange={(val) => updateField("day", val)}
          style={{ flex: 1 }}
        >
          <Picker.Item label="Select Day" value="" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
        </Picker>
      </View>

      {/* Time Pickers */}
      <TimeField
        label="Start Time"
        value={courseData.startTime}
        onPress={() => setPickerMode("start")}
      />
      <TimeField
        label="End Time"
        value={courseData.endTime}
        onPress={() => setPickerMode("end")}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode="time"
        date={
          pickerMode === "start"
            ? courseData.startTime || new Date()
            : courseData.endTime || new Date()
        }
        onConfirm={(date:any) => {
          if (pickerMode === "start") updateField("startTime", date);
          else updateField("endTime", date);
          setPickerMode(null);
        }}
        onCancel={() => setPickerMode(null)}
      />

      {/* Submit Button */}
      <TouchableOpacity
        disabled={!isFormValid}
        onPress={handleSubmit}
        className={`mt-8 p-4 rounded-2xl ${
          isFormValid ? "bg-[#5BBAC9]" : "bg-gray-400"
        }`}
      >
        <Text className="text-white text-center font-bold text-xl">
          Add Course
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InputField({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <View className="flex-row items-center border-b border-gray-300 py-3 mb-2">
      {icon}
      <TextInput
        className="flex-1 ml-3 text-lg"
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

function TimeField({
  label,
  value,
  onPress,
}: {
  label: string;
  value: Date | null;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center border-b border-gray-300 py-3 mt-4"
    >
      <CalendarClock color="gray" size={24} />
      <Text className="ml-3 text-lg text-gray-600">
        {value
          ? value.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : `Select ${label}`}
      </Text>
    </TouchableOpacity>
  );
}
