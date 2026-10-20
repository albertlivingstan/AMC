'use client';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StartupSplash } from '../src/components/StartupSplash';
import '../src/theme';

let AppComp: any = null;

export default function SiteClient() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    import('../src/main').then((m) => {
      AppComp = m.App;
      if (active) {
        setMounted(true);
        Promise.resolve(document.fonts?.ready).finally(() => {
          if (active) setReady(true);
        });
      }
    }).catch(() => {
      if (active) setReady(true);
    });
    return () => { active = false; };
  }, []);

  const Comp = AppComp;
  return (
    <StartupSplash ready={ready}>
      {mounted && Comp ? (
        <BrowserRouter>
          <Comp />
        </BrowserRouter>
      ) : (
        <div style={{ minHeight: '100vh', background: '#0a0f19' }} />
      )}
    </StartupSplash>
  );
}
