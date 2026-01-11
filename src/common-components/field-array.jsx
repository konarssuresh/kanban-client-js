import { clsx } from "clsx";
import { useFieldArray, Controller } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import { TextField } from "./text-field";
import { Button } from "./button";
import IconCross from "./icons/IconCross";

export const FieldArray = ({
  form,
  name,
  rules = {},
  disabled = false,
  addLabel = "",
  addValuePlaceholder = { name: "" },
  fieldPlaceholder = "",
  label = "",
  fieldIdentifier = "name",
  fieldRules = { required: "Column name is required" },
}) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules,
  });

  const fieldArrayContainerClasses = clsx({
    "flex flex-col gap-4": true,
  });
  return (
    <div className={fieldArrayContainerClasses}>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-grey-400 text-md">{label}</label>
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => {
            return (
              <div key={index} className="flex flex-row gap-2 items-center">
                <Controller
                  name={`${name}.${index}.${fieldIdentifier}`}
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        isError={!isEmpty(error)}
                        helperText={error?.message}
                        placeholder={fieldPlaceholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                      />
                    );
                  }}
                  rules={fieldRules}
                />
                <button
                  className={clsx("text-grey-400 cursor-pointer")}
                  onClick={() => remove(index)}
                >
                  <IconCross />
                </button>
              </div>
            );
          })}
          <Button
            disabled={disabled}
            variant="secondary"
            onClick={() => append(addValuePlaceholder)}
          >
            + {addLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FieldArray;
