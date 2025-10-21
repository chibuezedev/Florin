"use client";

import { useState } from "react";
import { Home, Wallet, TrendingUp, Settings, Menu, X } from "lucide-react";
import type React from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export function FloatingNavigator() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: <Home size={22} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={22} /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp size={22} /> },
    { id: "settings", label: "Settings", icon: <Settings size={22} /> },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="flex flex-col gap-3 mb-3 animate-in fade-in duration-200">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black text-white shadow-lg hover:bg-accent hover:text-black transition-all duration-200"
                style={{
                  animation: isOpen
                    ? `slideUp 0.25s ease-out ${index * 0.04}s forwards`
                    : "none",
                }}
              >
                <span className="flex items-center justify-center">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Floating toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-accent text-black shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
          {isOpen ? (
            <X size={26} className="transition-transform duration-300" />
          ) : (
            <Menu size={26} className="transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Dim background overlay when open */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-200"
          aria-label="Close menu"
        />
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
