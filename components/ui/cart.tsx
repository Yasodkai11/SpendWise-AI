import React from "react";

type CartProps = {
  count?: number;
  className?: string;
  onClick?: () => void;
};

export function Cart({ count = 0, className = "", onClick }: CartProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open cart"
      className={`inline-flex items-center gap-2 rounded-lg border p-2 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 21a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>

      {count > 0 && (
        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-black px-2 text-xs text-white">
          {count}
        </span>
      )}
    </button>
  );
}

export default Cart;
