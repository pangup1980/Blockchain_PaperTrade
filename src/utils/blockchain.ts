// Blockchain utilities for recording trades

import crypto from 'crypto';

interface TradeData {
  userId: string;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
  timestamp: Date;
}

export const generateBlockchainHash = (data: TradeData, prevHash?: string): string => {
  const dataString = JSON.stringify({
    userId: data.userId,
    type: data.type,
    symbol: data.symbol,
    quantity: data.quantity,
    price: data.price,
    timestamp: data.timestamp,
    prevHash: prevHash || '0',
  });

  return crypto.createHash('sha256').update(dataString).digest('hex');
};

export const generateBlockchainTransaction = (
  hash: string,
  prevHash: string,
  index: number
): string => {
  return `0x${hash}${prevHash}${index}`;
};

export const verifyBlockchainIntegrity = (
  hash: string,
  data: TradeData,
  prevHash?: string
): boolean => {
  const calculatedHash = generateBlockchainHash(data, prevHash);
  return calculatedHash === hash;
};

export const createBlockchainRecord = (
  tradeId: string,
  data: TradeData,
  prevHash?: string
) => {
  const hash = generateBlockchainHash(data, prevHash);
  const txId = generateBlockchainTransaction(hash, prevHash || '0', Date.now());

  return {
    tradeId,
    hash,
    prevHash: prevHash || '0',
    timestamp: new Date(),
    userId: data.userId,
    type: data.type,
    symbol: data.symbol,
    quantity: data.quantity,
    price: data.price,
    blockchainTxId: txId,
  };
};
