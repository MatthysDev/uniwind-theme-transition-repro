# uniwind-pro theme-transition overlay invisible with react-native-screens (iOS)

Minimal reproduction for: **`Uniwind.setTheme(theme, { preset })` flips the theme but the animated overlay is never visible** on iOS when the screen content is hosted in `react-native-screens` native screens (the default with `expo-router` / native-stack).

Two standalone Expo apps that are **byte-identical except a single line**:

| App | Difference | Result |
|---|---|---|
| [`apps/not-working`](apps/not-working) | native screens ON (default) | ❌ theme flips **instantly**, no fade |
| [`apps/working`](apps/working) | `enableScreens(false)` in `app/_layout.tsx` | ✅ smooth **CircleCenter** fade |

The only diff is in `app/_layout.tsx` ([not-working](apps/not-working/app/_layout.tsx) vs [working](apps/working/app/_layout.tsx)).

## Run

Each app is independent (no workspace). Requires a uniwind-pro license to install.

```bash
# not-working (reproduces the bug)
cd apps/not-working
bun install        # or npm install
npx expo run:ios

# working (fade is visible)
cd ../working
bun install
npx expo run:ios
```

Then tap **“Toggle theme (CircleCenter)”** on either screen (Home or the pushed Detail screen).

- `not-working` → the colors swap with **no animation** (instant flip).
- `working` → you see the **circular reveal** wiping in from the center.

The toggle is in [`toggle-theme.ts`](apps/not-working/toggle-theme.ts) and intentionally uses **no React state / no `useUniwind()`**, so a toggle triggers **zero React re-render** — this isolates the issue purely to the native snapshot overlay (every `bg-*` / `text-*` view flips via the shadow tree with no re-render; only the native overlay should animate).

## Root cause

In the Pro native source `ios/NativePlatformTransition+ios.swift` → `prepareTransition(type:)`:

```swift
if let snapshot = window.snapshotView(afterScreenUpdates: false) { … }
```

With `react-native-screens` native screens (New Architecture / Fabric), the visible content lives in native `UIViewController`s whose layers are **not yet in the window's committed render tree** at snapshot time, so `afterScreenUpdates: false` returns a **blank/transparent snapshot**. The overlay is added and animated, but it's empty → nothing visible → looks like an instant flip.

Disabling native screens (`enableScreens(false)`) puts the whole hierarchy back in the window's normal layer tree, so the snapshot captures it and the overlay is visible — that's the only difference between the two apps.

## Proposed fix (1 line)

```swift
window.snapshotView(afterScreenUpdates: true)
```

The snapshot is taken **before** the appearance flip, so it still captures the previous theme. Cost is one render flush per user-initiated toggle (negligible). With this change the fade works on every screen **with native screens enabled** (verified on device).

## Environment

- `uniwind-pro` **1.3.0**
- React Native **0.85.3**, Expo SDK **56**, **New Architecture** (Fabric)
- `react-native-screens` **4.25.2**, `expo-router` **56.2.8**
- iOS (physical device + simulator)
