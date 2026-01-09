import { clsx } from "clsx";

export const Button = ({
  variant = "primary",
  size = "large",
  children,
  className = "",
  onClick,
}) => {
  const backgroundClasses = clsx({
    "bg-purple-700 hover:bg-purple-500": variant === "primary",
    "bg-purple-700/25": variant === "secondary",
    "bg-red-700 hover:bg-red-500": variant === "danger",
  });

  const textClasses = clsx({
    "text-white": variant === "primary" || variant === "danger",
    "text-purple-700": variant === "secondary",
    "text-md": size === "large",
    "text-sm": size === "small",
  });

  const genericClasses = clsx({
    "px-4 py-2 rounded-full cursor-pointer": true,
  });

  return (
    <button
      onClick={onClick}
      className={`${backgroundClasses} ${textClasses} ${genericClasses} ${className}`}
    >
      {children}
    </button>
  );
};
