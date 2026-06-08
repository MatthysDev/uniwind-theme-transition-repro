// ───────────────────────────────────────────────────────────────────────────
// WORKING variant.
//
// The ONLY difference vs apps/not-working: `enableScreens(false)`.
// react-native-screens now renders plain RN views instead of native
// UIViewControllers, so the whole hierarchy is in the window's committed layer
// tree -> `window.snapshotView(afterScreenUpdates: false)` captures it -> the
// CircleCenter theme transition overlay is visible -> smooth fade.
// ───────────────────────────────────────────────────────────────────────────
import { enableScreens } from 'react-native-screens';

enableScreens(false);

import { Stack } from 'expo-router';

import '../global.css';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: true }} />;
}
