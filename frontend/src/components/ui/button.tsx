import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        variant === "default" &&
          "bg-blue-600 text-white hover:bg-blue-700",
        variant === "destructive" &&
          "bg-red-600 text-white hover:bg-red-700",
        className
      )}
      {...props}
    />
  );
}