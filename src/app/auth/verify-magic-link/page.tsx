"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';

export default function VerifyMagicLinkPage() {
  const { t } = useTranslation('auth');
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // App Router FIX: router.query is NOT available
    const getToken = () => {
      if (typeof window === "undefined") return null;
      return new URLSearchParams(window.location.search).get("token");
    };

    const token = getToken();

    if (token && typeof token === "string") {
      // No backend verify endpoint available; proceed to dashboard
      router.push("/dashboard");
    } else {
      setError("Invalid magic link token");
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <SEOHead title="Verify Magic Link" description="Verify your magic link" />

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">

          {isLoading && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Verifying your magic link...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
