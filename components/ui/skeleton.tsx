import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
}

export function Skeleton({
  width = "100%",
  height = "20px",
  circle = false,
  count = 1,
  className = "",
  ...props
}: SkeletonProps) {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`
            animate-pulse bg-neutral-200 rounded-lg
            ${circle ? "rounded-full" : ""}
            ${className}
          `}
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
          }}
          {...props}
        />
      ))}
    </>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white p-6 border border-border-light">
      <Skeleton height={24} className="mb-4 w-2/3" />
      <div className="space-y-3">
        <Skeleton height={16} />
        <Skeleton height={16} width="80%" />
        <Skeleton height={16} width="90%" />
      </div>
    </div>
  );
}

export default Skeleton;
