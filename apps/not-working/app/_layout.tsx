// ───────────────────────────────────────────────────────────────────────────
// NOT-WORKING variant.
//
// react-native-screens native screens are ON (the default). The screen content
// is hosted in native UIViewControllers, so when uniwind-pro takes the overlay
// snapshot with `window.snapshotView(afterScreenUpdates: false)` the content is
// not yet in the window's committed layer tree -> the snapshot is BLANK ->
// the CircleCenter theme transition is invisible (looks like an instant flip).
//
// Compare with apps/working, whose ONLY difference is `enableScreens(false)`.
// ───────────────────────────────────────────────────────────────────────────
import { Stack } from 'expo-router';

import '../global.css';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: true }} />;
}
