import React from "react";

type BadgeVariant = "default" | "success" | "danger" | "warning" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-text-primary",
  success: "bg-success-50 text-success-700 ring-1 ring-success-100",
  danger: "bg-danger-50 text-danger-700 ring-1 ring-danger-100",
  warning: "bg-warning-50 text-warning-700 ring-1 ring-warning-100",
  info: "bg-primary-50 text-primary-700 ring-1 ring-primary-100",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-1 text-xs font-medium",
  md: "px-3 py-1.5 text-sm font-medium",
};

export function Badge({
  variant = "default",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex h-3 w-3">{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
