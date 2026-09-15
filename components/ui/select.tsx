import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
}

export function Select({
  label,
  error,
  helperText,
  options = [],
  fullWidth = true,
  className = "",
  id,
  children,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-text-primary shadow-sm
          transition-colors duration-200 cursor-pointer
          focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100
          disabled:bg-neutral-100 disabled:text-text-tertiary disabled:cursor-not-allowed
          ${error ? "border-danger-500 focus:ring-danger-100 focus:border-danger-500" : ""}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {children}
      </select>
      {error && <p className="mt-1.5 text-sm text-danger-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}

export default Select;
