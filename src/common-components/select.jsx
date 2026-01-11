import { clsx } from "clsx";

export const Select = ({
  options,
  onChange,
  value,
  onBlur,
  label,
  isError,
  helperText,
}) => {
  const dropdownClasses = clsx({
    "select select-primary w-full": true,
  });

  const wrapperClasses = clsx({
    "flex flex-col gap-1 w-full": true,
  });

  const optionClasses = clsx({
    "": true,
  });

  const labelClasses = clsx({
    "text-grey-400 ": true,
    "text-md": true,
  });

  const textClasses = clsx({
    "border-2": true,
    "border-red-500": isError,
    "border-grey-300": !isError,
    "placeholder:text-grey-300": true,
  });
  const helperTextColorClass = isError ? "text-red-500" : "text-black";
  let helperClass = `${helperTextColorClass} text-sm`;

  const selectClasses = `${dropdownClasses} ${textClasses}`;

  return (
    <div className={wrapperClasses}>
      {label && <label className={labelClasses}>{label}</label>}
      <select
        className={selectClasses}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      >
        {options.map((option) => {
          return (
            <option
              className={optionClasses}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      {helperText && (
        <div className="flex flex-row align-center gap-1">
          <span className={`${helperClass} text-preset-5`}>{helperText}</span>
        </div>
      )}
    </div>
  );
};

export default Select;
