import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import isEmpty from "lodash/isEmpty";
import validator from "validator";

import { useLogin } from "../../hooks/useLogin";

import LogoLight from "../../common-components/icons/LogoLight";
import { Button } from "../../common-components/button";
import { TextField } from "../../common-components/text-field";

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    defaultValues: {
      emailId: "",
      password: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/boards");
    }
  }, [navigate]);

  const { mutate: loginMutate, isPending } = useLogin();
  return (
    <div className="bg-neutral-200 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 shadow-lg rounded-lg p-4 bg-white justify-center items-center m-8 md:m-0 grow md:grow-0 md:w-135 md:h-115">
        <LogoLight />
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-preset-1 text-neutral-950 text-center">
            Welcome to Kanban board
          </h1>
          <h5 className="text-preset-5 text-center text-neutral-500">
            Please login to continue
          </h5>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Controller
            name="emailId"
            control={control}
            rules={{
              required: "Email ID is required",
              validate: (value) => {
                return (
                  validator.isEmail(value) || "Enter a valid email address"
                );
              },
            }}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  isError={!isEmpty(error)}
                  helperText={error?.message}
                  placeholder="email@example.com"
                  label="Email Address"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              validate: (value) => {
                return (
                  validator.isStrongPassword(value) ||
                  "Password should contain at least 8 characters, including uppercase, lowercase, number, and special character."
                );
              },
            }}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  isError={!isEmpty(error)}
                  helperText={error?.message}
                  placeholder="Enter your password"
                  label="Password"
                  type="password"
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
            className="w-full mt-2"
            onClick={() => {
              loginMutate(getValues(), {
                onSuccess: () => {
                  navigate("/boards");
                },
              });
            }}
          >
            Login
          </Button>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <span className="text-neutral-600 text-preset-5">
            No account yet?
          </span>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
