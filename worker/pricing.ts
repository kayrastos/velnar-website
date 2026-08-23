export type PackageId = 'starter' | 'business' | 'ai-business';
export type Market = 'turkey' | 'international';
export type Language = 'tr' | 'en';

export interface PackagePriceInfo {
  id: PackageId;
  name: string;
  totalPrice: number;
  initialPayment: number;
  remainingPayment: number;
  currency: 'TRY' | 'USD';
}

export const SERVER_PRICES: Record<Market, Record<PackageId, PackagePriceInfo>> = {
  turkey: {
    starter: {
      id: 'starter',
      name: 'STARTER',
      totalPrice: 6320,
      initialPayment: 3160,
      remainingPayment: 3160,
      currency: 'TRY',
    },
    business: {
      id: 'business',
      name: 'BUSINESS',
      totalPrice: 10320,
      initialPayment: 5160,
      remainingPayment: 5160,
      currency: 'TRY',
    },
    'ai-business': {
      id: 'ai-business',
      name: 'AI BUSINESS',
      totalPrice: 15920,
      initialPayment: 7960,
      remainingPayment: 7960,
      currency: 'TRY',
    },
  },
  international: {
    starter: {
      id: 'starter',
      name: 'STARTER',
      totalPrice: 400,
      initialPayment: 200,
      remainingPayment: 200,
      currency: 'USD',
    },
    business: {
      id: 'business',
      name: 'BUSINESS',
      totalPrice: 640,
      initialPayment: 320,
      remainingPayment: 320,
      currency: 'USD',
    },
    'ai-business': {
      id: 'ai-business',
      name: 'AI BUSINESS',
      totalPrice: 1000,
      initialPayment: 500,
      remainingPayment: 500,
      currency: 'USD',
    },
  },
};

export function isValidPackageId(pkg: unknown): pkg is PackageId {
  return typeof pkg === 'string' && (pkg === 'starter' || pkg === 'business' || pkg === 'ai-business');
}

export function isValidMarket(market: unknown): market is Market {
  return typeof market === 'string' && (market === 'turkey' || market === 'international');
}

export function isValidLanguage(lang: unknown): lang is Language {
  return typeof lang === 'string' && (lang === 'tr' || lang === 'en');
}

export function getPackagePriceInfo(market: Market, packageId: PackageId): PackagePriceInfo {
  return SERVER_PRICES[market][packageId];
}
