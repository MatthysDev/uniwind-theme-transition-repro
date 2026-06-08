import { ThemeTransitionPreset, Uniwind } from 'uniwind';

// Deliberately NO React state / useUniwind() here, so a theme toggle triggers
// ZERO React re-render. This isolates the bug to the native snapshot overlay:
// every themed view (bg-background / bg-card / text-foreground) flips via Uniwind's
// shadow tree with no re-render, and the ONLY thing that should animate is the
// native CircleCenter overlay.
let current: 'light' | 'dark' = 'light';

export function toggleTheme() {
  current = current === 'dark' ? 'light' : 'dark';
  Uniwind.setTheme(current, { preset: ThemeTransitionPreset.CircleCenter });
}
