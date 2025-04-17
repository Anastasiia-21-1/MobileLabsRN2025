import { StyleSheet, Text, View } from 'react-native';
import { NewsList } from "@/components/NewsList";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>News</Text>
      <NewsList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  registerButton: {
    marginBottom: 20,
  }
});
