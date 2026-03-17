'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';

interface HeaderProps {
  user?: { username: string; email: string };
  balance?: number;
  onLogout?: () => void;
}

export default function Header({ user, balance = 0, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold">📈 BlockPaperTrade</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-4">
              <Link href="/dashboard" className="hover:text-blue-200 transition">
                Dashboard
              </Link>
              <Link href="/stocks" className="hover:text-blue-200 transition">
                Stocks
              </Link>
              <Link href="/portfolio" className="hover:text-blue-200 transition">
                Portfolio
              </Link>
              <Link href="/history" className="hover:text-blue-200 transition">
                History
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {balance !== undefined && (
                <div className="flex items-center bg-blue-800 px-4 py-2 rounded-lg">
                  <span className="text-sm">Balance: </span>
                  <span className="font-bold ml-2">₹{balance.toLocaleString()}</span>
                </div>
              )}

              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm">{user.username}</span>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button md:hidden onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/dashboard" className="hover:bg-blue-800 px-2 py-1 rounded">
                Dashboard
              </Link>
              <Link href="/stocks" className="hover:bg-blue-800 px-2 py-1 rounded">
                Stocks
              </Link>
              <Link href="/portfolio" className="hover:bg-blue-800 px-2 py-1 rounded">
                Portfolio
              </Link>
              <Link href="/history" className="hover:bg-blue-800 px-2 py-1 rounded">
                History
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
