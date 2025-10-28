import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#00AEEF',
        tabBarStyle: { backgroundColor: '#101010' },
        headerStyle: { backgroundColor: '#101010' },
        headerTintColor: 'white',
      }}
    >
      <Tabs.Screen name="home"       options={{ title: 'Home' }} />
      <Tabs.Screen name="tuner"      options={{ title: 'Tuner' }} />
      <Tabs.Screen name="metronome"  options={{ title: 'Metronome' }} />
      <Tabs.Screen name="chords"     options={{ title: 'Chords' }} />
      <Tabs.Screen name="community"  options={{ title: 'Community' }} />
    </Tabs>
  );
}
