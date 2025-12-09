'use client';

import { useTranslation } from 'react-i18next';

export default function Lang() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-primary-300">web view text: </h1>
      <h1 className="text-2xl font-bold text-primary-300">{t('hello')}</h1>
    </div>
  );
}
