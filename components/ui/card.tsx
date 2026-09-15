import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  noBorder?: boolean;
  variant?: "default" | "elevated" | "outlined";
}

export function Card({
  children,
  className = "",
  noPadding = false,
  noBorder = false,
  variant = "default",
  ...props
}: CardProps) {
  const baseStyles =
    "rounded-3xl bg-white/95 transition-all duration-200 backdrop-blur";

  const variantStyles: Record<string, string> = {
    default:
      "border border-border-light shadow-lg shadow-primary-100/40 hover:shadow-xl",
    elevated:
      "border border-border-light shadow-xl shadow-primary-100/40 hover:shadow-2xl",
    outlined: "border-2 border-primary-100",
  };

  const paddingStyles = noPadding ? "" : "p-6 sm:p-7";

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
