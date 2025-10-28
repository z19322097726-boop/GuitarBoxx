import { StyleSheet, Text, View } from 'react-native';

export default function Chords() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Chords（占位）</Text>
      <Text style={styles.tip}>此处将展示和弦库与指法图（占位）</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#0d0f10', padding: 20 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
  tip: { color: '#9aa0a6', marginTop: 8 },
});
