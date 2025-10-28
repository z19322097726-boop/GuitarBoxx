import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';

function ThemedText(props: { children: React.ReactNode; style?: any }) {
  return <Text style={[{ color: 'white', fontSize: 16 }, props.style]}>{props.children}</Text>;
}

function ThemedView(props: { children: React.ReactNode; style?: any }) {
  return <View style={[{ backgroundColor: '#00000000' }, props.style]}>{props.children}</View>;
}

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
