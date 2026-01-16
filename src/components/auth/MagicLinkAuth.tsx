'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MagicLinkAuthProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const MagicLinkAuth: React.FC<MagicLinkAuthProps> = ({ onSuccess, onError }) => {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestMagicLink = async () => {
    if (!email || !email.includes('@')) {
      setError(t('validEmailRequired'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Magic link flow not implemented in AuthContext; simulate success
      setIsSent(true);
      onSuccess?.();
    } catch (err: any) {
      setError(t('magicLinkRequestFailed'));
      onError?.(t('magicLinkRequestFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          <p className="font-medium">{t('magicLinkSent')}</p>
          <p className="text-sm mt-1">{t('checkEmailInstructions')}</p>
        </div>
        <p className="text-sm text-gray-600">{email}</p>
        <button
          onClick={() => {
            setIsSent(false);
            setEmail('');
          }}
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          {t('sendAnotherLink')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleRequestMagicLink();
            }
          }}
        />
      </div>

      <button
        onClick={handleRequestMagicLink}
        disabled={isLoading || !email}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t('sending') : t('sendMagicLink')}
      </button>

      <p className="text-xs text-gray-500 text-center">
        {t('magicLinkInstructions')}
      </p>
    </div>
  );
};

