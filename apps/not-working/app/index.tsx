import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { toggleTheme } from '../toggle-theme';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center gap-8 bg-background">
      <Text className="text-2xl font-bold text-foreground">Home</Text>

      <View className="h-40 w-72 items-center justify-center rounded-3xl bg-card">
        <Text className="text-base text-foreground">bg-card surface</Text>
      </View>

      <Pressable onPress={toggleTheme} className="rounded-full bg-primary px-8 py-4">
        <Text className="text-base font-bold text-black">Toggle theme (CircleCenter)</Text>
      </Pressable>

      <Link href="/detail" className="text-base text-foreground underline">
        Go to Detail →
      </Link>
    </View>
  );
}
