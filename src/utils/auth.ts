// Authentication utilities
import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Token utilities
import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET || 'secret-key',
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): { userId: string; email: string } | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret-key') as { userId: string; email: string };
  } catch {
    return null;
  }
};
