import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AccountScreen(){
  const [email,setEmail]=useState(''); const [pwd,setPwd]=useState('');
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Account</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#596066" style={styles.input}/>
      <TextInput value={pwd} onChangeText={setPwd} placeholder="Password" placeholderTextColor="#596066" secureTextEntry style={styles.input}/>
      <Pressable onPress={()=>alert(`模拟登录：${email}`)} style={styles.btn}><Text style={styles.btnText}>登录（占位）</Text></Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap:{flex:1,backgroundColor:'#0d0f10',padding:20,gap:12},
  title:{color:'white',fontSize:22,fontWeight:'700'},
  input:{backgroundColor:'#15181a',color:'white',padding:12,borderRadius:10,borderWidth:1,borderColor:'#232629'},
  btn:{backgroundColor:'#111317',paddingVertical:12,paddingHorizontal:20,borderRadius:10,borderWidth:1,borderColor:'#2a2f34',alignSelf:'flex-start'},
  btnText:{color:'#E6F4FF',fontWeight:'700'},
});
