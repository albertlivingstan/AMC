# Anointing Ministries · Premium Splash Kit

Copy `public/splash` into your project's `public` folder, then copy the two files in `src/components` into your components folder. No GitHub changes are made by this kit.

## Assets

- `anointing-splash.png`: generated portrait artwork, 941 × 1672 pixels. Recommended web asset for faster startup.
- `anointing-splash-4k.svg`: self-contained 2160 × 3840 portrait canvas, embedding the same PNG. It scales for displays but does not add native raster detail. This is a 4K-size SVG export, not a native 4K PNG.

The original ministry emblem was supplied as the image-generation reference; the result is an AI-rendered interpretation, not a byte-identical logo composite. Inspect branding before release.

## React integration

```tsx
import { useEffect, useState } from 'react';
import { StartupSplash } from './components/StartupSplash';

export function Root() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    // Replace with essential initialization if your application needs it.
    Promise.resolve(document.fonts?.ready).finally(() => {
      if (active) setReady(true);
    });
    return () => { active = false; };
  }, []);

  return <StartupSplash ready={ready}><App /></StartupSplash>;
}
```

Use `Root` in your existing `createRoot(...).render(...)`, inside any existing providers. For Next.js, add `'use client';` as the first line of the component and render it in a client wrapper. The supplied component targets React 19 (matching the church project), supports reduced motion, releases on image failure, and has an 8-second fallback plus an accessible Enter ministry button. It never shows fake loading percentages. Keep initialization errors visible in the app after the splash exits.

To use the SVG instead, pass `imageSrc="/splash/anointing-splash-4k.svg"`. In plain HTML: `<img src="/splash/anointing-splash.png" alt="Anointing Ministries" style="width:100%;height:100dvh;object-fit:contain">`. Use `contain` to preserve all wording on wide or tall devices.

This is an in-app web splash, not an Android/iOS operating-system launch-screen configuration.

## Artwork direction

Created with the built-in image-generation tool. Prompt direction: premium portrait ministry launch artwork; faithful ministry emblem reference; luminous ivory, burgundy serif ministry name, antique gold medallion, gentle sunlight and silk texture; exact wording “ANOINTING MINISTRIES”, “BIBLE · WORSHIP · COMMUNITY”, “A place to belong. A faith to live.”; no device frame, UI or fake progress.

Validation: PNG dimensions checked; SVG XML and embedded image checked; React component typechecked against the existing project's React 19/TypeScript dependencies. No deployment performed.
