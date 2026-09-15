import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  helperText,
  icon,
  fullWidth = true,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-text-primary shadow-sm
            placeholder:text-text-tertiary transition-colors duration-200
            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100
            disabled:bg-neutral-100 disabled:text-text-tertiary disabled:cursor-not-allowed
            ${icon ? "pl-10" : ""}
            ${error ? "border-danger-500 focus:ring-danger-100 focus:border-danger-500" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-danger-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}

export default Input;
