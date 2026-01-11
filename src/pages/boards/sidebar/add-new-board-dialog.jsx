import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import isEmpty from "lodash/isEmpty";

import { useAddBoardMutation } from "../hooks/useAddBoardMutation";
import { ModalDialog } from "../../../common-components/dialog";
import { Button } from "../../../common-components/button";
import { TextField } from "../../../common-components/text-field";
import { FieldArray } from "../../../common-components/field-array";

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

  const formContainerClasses = clsx({
    "flex flex-col gap-4 w-120": true,
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
        <FieldArray
          form={form}
          name="columns"
          rules={{ minLength: 1 }}
          disabled={isPending}
          addLabel="Add New Column"
          addValuePlaceholder={{ name: "" }}
          fieldPlaceholder="Enter column name"
          label="Board Columns"
          fieldIdentifier="name"
        />
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
