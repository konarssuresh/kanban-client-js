import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import isEmpty from "lodash/isEmpty";

import { useAddColumnMutation } from "../../hooks/useAddColumnMutation";
import { useBoardStore } from "../../../../store/useBoardStore";
import { ModalDialog } from "../../../../common-components/dialog";
import { TextField } from "../../../../common-components/text-field";
import { Button } from "../../../../common-components/button";

const AddColumnDialog = ({ onClose, board }) => {
  const { selectedBoard, setSelectedBoard } = useBoardStore();
  const queryClient = useQueryClient();
  const { control, formState, getValues } = useForm({
    defaultValues: {
      columnName: "",
    },
  });

  const { mutate, isPending } = useAddColumnMutation({ boardId: board.id });

  const { errors, isDirty } = formState;

  const onSubmit = () => {
    const { columnName } = getValues();

    const reqObj = {
      name: columnName,
    };

    mutate(reqObj, {
      onSuccess: (resp) => {
        queryClient.setQueryData(["boards"], (oldData) => {
          return oldData.map((b) => {
            if (b.id === board.id) {
              return {
                ...b,
                columns: [...b.columns, resp],
              };
            }
            return b;
          });
        });
        setSelectedBoard({
          ...selectedBoard,
          columns: [...selectedBoard.columns, resp],
        });
        onClose();
      },
    });
  };

  const modalContainerClasses = clsx({
    "flex flex-col gap-4 w-120": true,
  });

  return (
    <ModalDialog open title="Add New Column" onClose={onClose}>
      <div className={modalContainerClasses}>
        <Controller
          name="columnName"
          control={control}
          rules={{ required: "Column name is required" }}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => {
            return (
              <TextField
                isError={!isEmpty(error)}
                helperText={error?.message}
                placeholder="Enter column name"
                label="Name"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            );
          }}
        />
        <Button
          disabled={!isDirty || !isEmpty(errors) || isPending}
          variant="primary"
          onClick={onSubmit}
        >
          Save Changes
        </Button>
      </div>
    </ModalDialog>
  );
};

export default AddColumnDialog;
