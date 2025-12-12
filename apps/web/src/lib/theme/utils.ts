const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('theme') || 'system';
  }

  return 'system';
};

export const initialTheme = getInitialTheme();
