import { useEffect } from 'react';

import { useColorScheme } from 'nativewind';

import { storage } from '../store';

const THEME_KEY = 'theme';

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const theme = storage.getString(THEME_KEY) ?? 'system';
    setColorScheme(theme as 'light' | 'dark' | 'system');
  }, [setColorScheme]);

  const changeTheme = (theme: string) => {
    setColorScheme(theme as 'light' | 'dark' | 'system');
    storage.set(THEME_KEY, theme);
  };

  return {
    theme: colorScheme,
    changeTheme,
  };
};
