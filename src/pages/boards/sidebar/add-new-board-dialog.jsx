import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import isEmpty from "lodash/isEmpty";

import { useAddBoardMutation } from "../hooks/useAddBoardMutation";
import { ModalDialog } from "../../../common-components/dialog";
import IconCross from "../../../common-components/icons/IconCross";
import { Button } from "../../../common-components/button";
import { TextField } from "../../../common-components/text-field";

const AddNewBoardDialog = ({ onClose }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      name: "",
      columns: [],
    },
    mode: "onBlur",
  });
  const { mutate, isPending } = useAddBoardMutation();

  const { control, formState } = form;

  const { isDirty, errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
    rules: { minLength: 1 },
  });

  const formContainerClasses = clsx({
    "flex flex-col gap-4 w-120": true,
  });

  const fieldArrayContainerClasses = clsx({
    "flex flex-col gap-4": true,
  });

  const handleSubmit = () => {
    const { name, columns } = form.getValues();

    const reqObj = {
      name,
      columns: columns.map((column) => column.name),
    };
    mutate(reqObj, {
      onSuccess: (resp) => {
        queryClient.setQueryData(["boards"], (oldData) => {
          return [...oldData, resp];
        });
        onClose();
      },
    });
  };

  console.log(formState.errors?.fieldArray?.root);
  console.log(formState.errors);
  console.log(formState.errors?.columns);

  return (
    <ModalDialog open title="Add New Board" onClose={onClose}>
      <div className={formContainerClasses}>
        <Controller
          name="name"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => {
            return (
              <TextField
                isError={!isEmpty(error)}
                helperText={error?.message}
                placeholder="Enter board name"
                label="Board Name"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            );
          }}
          rules={{ required: "Board name is required" }}
        />
        <div className={fieldArrayContainerClasses}>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-grey-400 text-md">Board Columns</label>
            <div className="flex flex-col gap-2">
              {fields.map((field, index) => {
                return (
                  <div key={index} className="flex flex-row gap-2 items-center">
                    <Controller
                      name={`columns.${index}.name`}
                      control={control}
                      render={({
                        field: { onChange, onBlur, value, ref },
                        fieldState: { error },
                      }) => {
                        return (
                          <TextField
                            isError={!isEmpty(error)}
                            helperText={error?.message}
                            placeholder="Enter column name"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                          />
                        );
                      }}
                      rules={{ required: "Column name is required" }}
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
                disabled={!isDirty || !isEmpty(errors) || isPending}
                variant="secondary"
                onClick={() => append({ name: "" })}
              >
                + Add New Column
              </Button>
            </div>
          </div>
        </div>
        <Button
          disabled={!isDirty || !isEmpty(errors) || isPending}
          variant="primary"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </ModalDialog>
  );
};

export default AddNewBoardDialog;
