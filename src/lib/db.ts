// Database utility functions

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Stock data helper - mock data for Indian stocks
export const getIndianStocks = () => {
  return [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      sector: 'Energy',
      price: 2750.5,
      change: 35.5,
      changePercent: 1.31,
      dayHigh: 2800,
      dayLow: 2700,
      fiftyTwoWeekHigh: 3200,
      fiftyTwoWeekLow: 2100,
      marketCap: '₹19,00,000 Cr',
      pe: 26.5,
      dividend: 8.5,
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      sector: 'IT',
      price: 3650.0,
      change: -25.0,
      changePercent: -0.68,
      dayHigh: 3700,
      dayLow: 3600,
      fiftyTwoWeekHigh: 4100,
      fiftyTwoWeekLow: 2800,
      marketCap: '₹14,00,000 Cr',
      pe: 32.1,
      dividend: 5.2,
    },
    {
      symbol: 'INFY',
      name: 'Infosys',
      sector: 'IT',
      price: 1680.0,
      change: 15.0,
      changePercent: 0.90,
      dayHigh: 1700,
      dayLow: 1650,
      fiftyTwoWeekHigh: 2000,
      fiftyTwoWeekLow: 1200,
      marketCap: '₹7,00,000 Cr',
      pe: 28.5,
      dividend: 3.8,
    },
    {
      symbol: 'HDFC-BANK',
      name: 'HDFC Bank',
      sector: 'Banking',
      price: 1580.0,
      change: 12.5,
      changePercent: 0.80,
      dayHigh: 1600,
      dayLow: 1550,
      fiftyTwoWeekHigh: 1900,
      fiftyTwoWeekLow: 1000,
      marketCap: '₹12,00,000 Cr',
      pe: 24.2,
      dividend: 2.5,
    },
    {
      symbol: 'ITC',
      name: 'ITC Limited',
      sector: 'FMCG',
      price: 410.5,
      change: -5.5,
      changePercent: -1.32,
      dayHigh: 430,
      dayLow: 405,
      fiftyTwoWeekHigh: 520,
      fiftyTwoWeekLow: 300,
      marketCap: '₹5,50,000 Cr',
      pe: 18.9,
      dividend: 6.1,
    },
    {
      symbol: 'WIPRO',
      name: 'Wipro Limited',
      sector: 'IT',
      price: 380.0,
      change: 5.0,
      changePercent: 1.33,
      dayHigh: 390,
      dayLow: 375,
      fiftyTwoWeekHigh: 450,
      fiftyTwoWeekLow: 250,
      marketCap: '₹2,80,000 Cr',
      pe: 22.1,
      dividend: 2.1,
    },
  ];
};
