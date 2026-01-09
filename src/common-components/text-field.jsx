import { clsx } from "clsx";

export const TextField = ({ helperText, label, isError, ...inputProps }) => {
  let labelClass = "";

  const inputClass = `w-full`;

  const genericClasses = clsx({
    "px-4 py-2 rounded-md": true,
  });

  const textClasses = clsx({
    "border-2": true,
    "border-red-500": isError,
    "border-grey-300": !isError,
    "placeholder:text-grey-300": true,
  });

  const labelClasses = clsx({
    "text-grey-400": true,
    "text-md": true,
    [labelClass]: Boolean(labelClass),
  });

  const helperTextColorClass = isError ? "text-red-500" : "text-black";
  let helperClass = `${helperTextColorClass} text-sm`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className={labelClasses}>{label}</label>}

      <input
        className={`${inputClass} ${genericClasses} ${textClasses}`}
        {...inputProps}
      />

      {helperText && (
        <div className="flex flex-row align-center gap-1">
          <span className={`${helperClass} text-preset-5`}>{helperText}</span>
        </div>
      )}
    </div>
  );
};
