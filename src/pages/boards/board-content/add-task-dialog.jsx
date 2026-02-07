import { clsx } from "clsx";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";

import { useAddTaskMutation } from "../hooks/useAddTaskMutation";
import { ModalDialog } from "../../../common-components/dialog";
import { TextField } from "../../../common-components/text-field";
import { Button } from "../../../common-components/button";
import { FieldArray } from "../../../common-components/field-array";
import { Select } from "../../../common-components/select";
import { addTaskToState } from "../../../store/boardEntities";

const AddTaskDialog = ({ onClose, board }) => {
  const queryClient = useQueryClient();

  const modalContainerClasses = clsx({
    "flex flex-col gap-4 w-120": true,
  });
  const { mutate, isPending } = useAddTaskMutation({ boardId: board?.id });
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      subtasks: [],
      status: board.columns.length > 0 ? board.columns[0].id : null,
    },
    mode: "all",
  });

  if (!board) {
    return null;
  }
  const { control, formState, getValues } = form;

  const { errors, isDirty } = formState;

  const boardOptions = board.columns.map((column) => ({
    value: column.id,
    label: column.name,
  }));

  const handleSubmit = () => {
    console.log(getValues());
    const { title, subtasks, description, status } = getValues();
    const req = { title, description, status };
    req.subtasks = subtasks?.map((task) => ({ ...task, isDone: false }));

    mutate(req, {
      onSuccess: (resp, r) => {
        queryClient.setQueryData(["boards"], (oldData) =>
          addTaskToState(oldData, r.status, resp),
        );

        onClose();
      },
    });
  };

  return (
    <ModalDialog open title="Add New Task" onClose={onClose}>
      <div className={modalContainerClasses}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <TextField
              isError={!isEmpty(error)}
              helperText={error?.message}
              placeholder="eg Title cofee break"
              label="Title"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <fieldset className="fieldset w-full">
              <legend className="text-md text-grey-400">Desccription</legend>
              <textarea
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                className="textarea h-24 w-full"
                placeholder="Bio"
              ></textarea>
              {error && <div className="label">{error.message}</div>}
            </fieldset>
          )}
        />
        <FieldArray
          form={form}
          name="subtasks"
          disabled={isPending}
          addLabel="Add New Subtask"
          addValuePlaceholder={{ title: "" }}
          fieldPlaceholder="Enter subtask title"
          label="Subtasks"
          fieldIdentifier="title"
          fieldRules={{ required: "title is required for subtask" }}
        />

        <Controller
          control={control}
          name="status"
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => {
            return (
              <Select
                options={boardOptions}
                isError={!isEmpty(error)}
                helperText={error?.message}
                placeholder="eg Title cofee break"
                label="Status"
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
          onClick={handleSubmit}
        >
          Create Task
        </Button>

        {/* Form fields for adding a new task can be added here */}
      </div>
    </ModalDialog>
  );
};
export default AddTaskDialog;
