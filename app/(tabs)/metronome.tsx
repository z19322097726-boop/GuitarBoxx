import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Metronome() {
  const [bpm, setBpm] = useState(90);
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(0); // 当前是第几拍
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => { stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function playClick(isAccent: boolean) {
    if (typeof window === 'undefined') return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // 重拍(第一拍)高音，其他拍低音
    osc.type = 'square';
    osc.frequency.value = isAccent ? 1500 : 900;
    gain.gain.value = isAccent ? 0.0025 : 0.0015;

    osc.connect(gain); 
    gain.connect(ctx.destination);

    osc.start(0);
    osc.stop(ctx.currentTime + 0.04);
  }

  function start() {
    if (running) return;
    setRunning(true);

    // 每次启动从第0拍开始
    setBeat(0);

    const intervalMs = (60 / bpm) * 1000;
    timerRef.current = window.setInterval(() => {
      setBeat(prev => {
        const nextBeat = (prev + 1) % 4; // 4拍循环
        const isAccent = nextBeat === 0; // 拍0当成"第一拍"
        playClick(isAccent);
        return nextBeat;
      });
    }, intervalMs);
  }

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Metronome（占位）</Text>
      <Text style={styles.tip}>BPM: {bpm}</Text>
      <Text style={styles.tip}>当前拍: {beat + 1}</Text>

      <View style={styles.row}>
        <Pressable onPress={() => setBpm(b => Math.max(40, b - 1))} style={styles.btn}>
          <Text style={styles.btnText}>-</Text>
        </Pressable>
        <Pressable onPress={() => setBpm(b => Math.min(240, b + 1))} style={styles.btn}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
        <Pressable onPress={start} style={styles.btn}>
          <Text style={styles.btnText}>Start</Text>
        </Pressable>
        <Pressable onPress={stop} style={styles.btn}>
          <Text style={styles.btnText}>Stop</Text>
        </Pressable>
      </View>

      {!running ? (
        <Text style={styles.state}>未运行</Text>
      ) : (
        <Text style={styles.state}>运行中（带重拍）</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#0d0f10', padding: 20 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
  tip: { color: '#9aa0a6', marginTop: 8 },
  row: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  btn: { backgroundColor: '#111317', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  btnText: { color: '#E6F4FF', fontWeight: '700' },
  state: { color: '#9aa0a6', marginTop: 16, fontWeight: '700' },
});
