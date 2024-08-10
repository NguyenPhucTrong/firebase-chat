import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function StartPage() {
  return (
    // <View style={styles.container}>
    //   <View style={styles.main}>
    //     <Text style={styles.title}>Hello World</Text>
    //     <Text style={styles.subtitle}>This is the first page of your app.</Text>
    //   </View>
    // </View>
    <View className="flex-1 justify-center items-center" >
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 40,
    backgroundColor: "#fecaca",

  }

});
