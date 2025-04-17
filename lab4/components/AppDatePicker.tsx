import {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DatePicker from "react-native-date-picker";

interface AppSelectDateProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export function AppSelectDate({value, onChange}: AppSelectDateProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.button}>
          <Text>
            Select date{value && `: ${value.toLocaleDateString()} ${value.toLocaleTimeString()}`}
          </Text>
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={value || new Date()}
        onConfirm={(date) => {
          setOpen(false)
          onChange(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderColor: '#d7d7d7',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 12,
  }
})