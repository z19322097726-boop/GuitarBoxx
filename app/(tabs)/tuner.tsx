import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Tuner() {
  const [granted, setGranted] = useState(false);
  const [listening, setListening] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  async function askPermission() {
    try {
      if (Platform.OS === 'web') {
        const s = await (navigator.mediaDevices as any).getUserMedia({ audio: true });
        streamRef.current = s;
        setGranted(true);
        alert('已获取麦克风（Web 演示，未做音高分析）');
      } else {
        alert('原生端稍后接入麦克风与音高库');
      }
    } catch (e: any) {
      alert('未能获取麦克风权限：' + e?.message);
    }
  }

  function start() {
    if (!granted) return alert('先点权限');
    setListening(true);
  }
  function stop() {
    setListening(false);
    streamRef.current?.getTracks()?.forEach(t => t.stop());
    streamRef.current = null;
  }

  useEffect(() => () => stop(), []);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Tuner（占位）</Text>
      <Text style={styles.tip}>当前仅做权限与流程演示。音高检测原生端接库。</Text>
      <Pressable onPress={askPermission} style={styles.btn}><Text style={styles.btnText}>请求麦克风权限</Text></Pressable>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
        <Pressable onPress={start} style={styles.btn}><Text style={styles.btnText}>开始</Text></Pressable>
        <Pressable onPress={stop} style={styles.btn}><Text style={styles.btnText}>停止</Text></Pressable>
      </View>
      <Text style={styles.state}>{listening ? '监听中（占位）' : '未开始'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#0d0f10', padding: 20, gap: 12 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
  tip: { color: '#9aa0a6' },
  btn: { backgroundColor: '#111317', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginTop: 8 },
  btnText: { color: '#E6F4FF', fontWeight: '700' },
  state: { color: '#9aa0a6', marginTop: 12 },
});
