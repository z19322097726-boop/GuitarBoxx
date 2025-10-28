import { useRef, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type Post = {
  id: string;
  name: string;
  url?: string;
  likes: number;
  likedByMe: boolean; // 新增：我当前是否已点赞
};

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function addPostWeb(file: File) {
    const url = URL.createObjectURL(file);
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setPosts(p => [
      {
        id,
        name: file.name,
        url,
        likes: 0,
        likedByMe: false,
      },
      ...p,
    ]);
  }

  function onPick() {
    if (Platform.OS === 'web') {
      inputRef.current?.click();
    } else {
      alert('原生端稍后接入媒体选择与上传');
    }
  }

  function toggleLike(id: string) {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== id) return post;
        // 如果已经点赞过 -> 取消; 没点过 -> 点赞
        if (post.likedByMe) {
          return {
            ...post,
            likedByMe: false,
            likes: post.likes - 1 < 0 ? 0 : post.likes - 1,
          };
        } else {
          return {
            ...post,
            likedByMe: true,
            likes: post.likes + 1,
          };
        }
      }),
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Community（占位）</Text>

      <Pressable onPress={onPick} style={styles.btn}>
        <Text style={styles.btnText}>选择视频（本地演示）</Text>
      </Pressable>

      {Platform.OS === 'web' && (
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) addPostWeb(f);
            if (inputRef.current) inputRef.current.value = '';
          }}
        />
      )}

      <FlatList
        data={posts}
        keyExtractor={it => it.id}
        contentContainerStyle={{ gap: 12, paddingTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>

            {Platform.OS === 'web' ? (
              <video
                src={item.url}
                controls
                style={{ width: '100%', height: 180, backgroundColor: '#000' }}
              />
            ) : (
              <Text style={styles.tip}>原生播放器待接入</Text>
            )}

            <Pressable
              onPress={() => toggleLike(item.id)}
              style={[
                styles.like,
                item.likedByMe && styles.likeActive,
              ]}
            >
              <Text style={[styles.likeText, item.likedByMe && styles.likeTextActive]}>
                👍 {item.likes}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#0d0f10', padding: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },

  btn: {
    backgroundColor: '#111317',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2f34',
    alignSelf: 'flex-start',
  },
  btnText: { color: '#E6F4FF', fontWeight: '700' },

  card: {
    backgroundColor: '#15181a',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#232629',
  },
  name: { color: '#E6F4FF', fontWeight: '700', marginBottom: 8 },
  tip: { color: '#9aa0a6' },

  like: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#0f1c22',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#143845',
  },
  likeActive: {
    backgroundColor: '#142a1a',
    borderColor: '#2ecc71',
  },
  likeText: { color: '#9bd1ff', fontWeight: '700' },
  likeTextActive: { color: '#2ecc71' },
});
