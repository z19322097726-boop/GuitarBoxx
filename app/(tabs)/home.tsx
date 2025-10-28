import { StyleSheet, Text, View } from 'react-native';
export default function HomeScreen(){
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Guitar Boxx</Text>
      <Text style={styles.sub}>Home 页面已就位。</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap:{flex:1,backgroundColor:'#0d0f10',padding:20,justifyContent:'center'},
  title:{color:'white',fontSize:28,fontWeight:'800',marginBottom:8},
  sub:{color:'#9aa0a6'},
});
