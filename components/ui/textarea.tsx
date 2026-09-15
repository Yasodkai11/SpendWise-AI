import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export function Textarea({
  label,
  error,
  helperText,
  fullWidth = true,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-text-primary shadow-sm
          placeholder:text-text-tertiary transition-colors duration-200 resize-vertical
          focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100
          disabled:bg-neutral-100 disabled:text-text-tertiary disabled:cursor-not-allowed
          ${error ? "border-danger-500 focus:ring-danger-100 focus:border-danger-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-danger-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}

export default Textarea;
