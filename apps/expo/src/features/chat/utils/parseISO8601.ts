export const parseISO8601 = (
  iso8601: string,
): { h: number; m: number; s: number } => {
  if (!iso8601 || !iso8601.startsWith('PT')) {
    return { h: 0, m: 0, s: 0 };
  }

  const match = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return { h: 0, m: 0, s: 0 };
  }

  return {
    h: match[1] ? parseInt(match[1], 10) : 0,
    m: match[2] ? parseInt(match[2], 10) : 0,
    s: match[3] ? parseInt(match[3], 10) : 0,
  };
};
