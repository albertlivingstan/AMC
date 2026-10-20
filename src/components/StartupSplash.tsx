import { useEffect, useRef, useState, type ReactNode } from 'react';
import './startup-splash.css';

type StartupSplashProps = {
  /** Set true when your app can be used. Do not wait for optional API calls. */
  ready: boolean;
  children: ReactNode;
  /** Root-relative path to an asset copied into public/splash. */
  imageSrc?: string;
  /** Release the splash if initialization or the image stalls. */
  maxWaitMs?: number;
};

export function StartupSplash({ ready, children, imageSrc = '/splash/anointing-splash.png', maxWaitMs = 8000 }: StartupSplashProps) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [imageSettled, setImageSettled] = useState(false);
  const image = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Cached images can finish before the load handler is attached.
    if (image.current?.complete) setImageSettled(true);
  }, []);

  useEffect(() => {
    if (ready && imageSettled) setLeaving(true);
  }, [ready, imageSettled]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), Math.max(0, maxWaitMs));
    return () => window.clearTimeout(timer);
  }, [maxWaitMs]);

  useEffect(() => {
    if (!leaving) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setVisible(false), reduced ? 0 : 450);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [visible]);

  return <>
    <div inert={visible || undefined}>{children}</div>
    {visible && <div className={'am-startup-splash' + (leaving ? ' am-startup-splash--leaving' : '')} role="status" aria-live="polite" aria-label="Opening Anointing Ministries">
      <img ref={image} src={imageSrc} width="941" height="1672" alt="Anointing Ministries — Bible, Worship, Community" fetchPriority="high" decoding="async" onLoad={() => setImageSettled(true)} onError={() => { setImageSettled(true); setLeaving(true); }}/>
      <button type="button" className="am-splash-skip" onClick={() => setLeaving(true)}>Enter ministry <span aria-hidden="true">→</span></button>
    </div>}
  </>;
}
