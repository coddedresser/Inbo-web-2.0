'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface OTPAuthProps {
  email?: string;
  phone?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const OTPAuth: React.FC<OTPAuthProps> = ({ email, phone, onSuccess, onError }) => {
  const { sendOTP, verifyOTP } = useAuth();
  const { t } = useTranslation('auth');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [otpEmail, setOtpEmail] = useState(email || '');
  const [otpPhone, setOtpPhone] = useState(phone || '');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState(0);

  const handleRequestOTP = async () => {
    if (!otpEmail && !otpPhone) {
      setError(t('emailOrPhoneRequired'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await sendOTP(otpEmail);
      setExpiresIn(300);
      setStep('verify');
    } catch (err: any) {
      setError(err?.response?.data?.message || t('otpRequestFailed'));
      onError?.(err?.response?.data?.message || t('otpRequestFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length < 4) {
      setError(t('invalidOTP'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyOTP(otpEmail, otpCode);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.message || t('otpVerificationFailed'));
      onError?.(err?.response?.data?.message || t('otpVerificationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'request') {
    return (
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('emailOrPhone')}
          </label>
          <div className="space-y-2">
            <input
              type="email"
              value={otpEmail}
              onChange={(e) => setOtpEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="text-center text-sm text-gray-500">{t('or')}</div>
            <input
              type="tel"
              value={otpPhone}
              onChange={(e) => setOtpPhone(e.target.value)}
              placeholder={t('phonePlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleRequestOTP}
          disabled={isLoading || (!otpEmail && !otpPhone)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('sending') : t('sendOTP')}
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
        <p className="text-sm text-gray-600 mb-2">
          {t('otpSentTo')} {otpEmail || otpPhone}
        </p>
        {expiresIn > 0 && (
          <p className="text-xs text-gray-500">Expires in {expiresIn} seconds</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('enterOTP')}</label>
        <input
          type="text"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
          placeholder="123456"
          maxLength={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setStep('request');
            setOtpCode('');
          }}
          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {t('back')}
        </button>
        <button
          onClick={handleVerifyOTP}
          disabled={isLoading || otpCode.length < 4}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('verifying') : t('verifyOTP')}
        </button>
      </div>
    </div>
  );
};

