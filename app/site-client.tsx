'use client';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

let AppComp: any = null;

export default function SiteClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    import('../src/main').then((m) => {
      AppComp = m.App;
      setMounted(true);
    });
  }, []);

  if (!mounted || !AppComp) {
    return (
      <div style={{minHeight:'100vh',background:'#101827',color:'#c9a76a',display:'grid',placeItems:'center',fontFamily:'serif'}}>
        Anointing Ministries · Loading your worship space…
      </div>
    );
  }

  const Comp = AppComp;
  return (
    <BrowserRouter>
      <Comp />
    </BrowserRouter>
  );
}
