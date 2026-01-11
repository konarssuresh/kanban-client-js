import { clsx } from "clsx";

const Select = ({ options, onChange, value, onBlur }) => {
  const dropdownClasses = clsx({
    "select select-primary": true,
  });

  const wrapperClasses = clsx({
    "": true,
  });

  const optionClasses = clsx({
    "": true,
  });
  return (
    <div className={wrapperClasses}>
      <select
        className={dropdownClasses}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      >
        {options.map((option) => {
          return (
            <options
              className={optionClasses}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </options>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
