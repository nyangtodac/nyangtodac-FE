'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTheme } from 'next-themes';

export default function ThemeSync() {
  const { setTheme } = useTheme();
  const searchParams = useSearchParams();

  useEffect(() => {
    const themeParam = searchParams.get('theme') ?? 'system';

    setTheme(themeParam);
  }, [searchParams, setTheme]);

  return null;
}
