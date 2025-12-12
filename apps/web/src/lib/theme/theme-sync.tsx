'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTheme } from 'next-themes';

export default function ThemeSync() {
  const { setTheme, resolvedTheme } = useTheme();
  const searchParams = useSearchParams();

  useEffect(() => {
    const themeParam = searchParams.get('theme');

    if (themeParam && themeParam !== resolvedTheme) {
      setTheme(themeParam);
    }
  }, [searchParams, setTheme, resolvedTheme]);

  return null;
}
