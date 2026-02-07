import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import validator from "validator";
import isEmpty from "lodash/isEmpty";

import { useSignup } from "../../hooks/useSignup";
import LogoIcon from "../../common-components/icons/LogoLight";
import { TextField } from "../../common-components/text-field";
import { Button } from "../../common-components/button";

const Signup = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { isDirty, errors },
    getValues,
  } = useForm({
    defaultValues: {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    mode: "onBlur",
  });
  const { mutate: signupMutate, isPending } = useSignup();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/notes");
    }
  }, [navigate]);
  return (
    <div className="bg-neutral-200 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 shadow-lg rounded-lg p-4 bg-white justify-center m-8 md:m-0 grow md:grow-0  items-center  md:w-135 md:h-145">
        <LogoIcon />
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-preset-1 text-neutral-950 text-center">
            Create Your Account
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First Name is required",
              }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    isError={!isEmpty(error)}
                    helperText={error?.message}
                    placeholder="Enter First Name"
                    label="First Name"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                  />
                );
              }}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Last Name is required",
              }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    isError={!isEmpty(error)}
                    helperText={error?.message}
                    placeholder="Enter Last Name"
                    label="Last Name"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                  />
                );
              }}
            />
          </div>
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
              signupMutate(getValues(), {
                onSuccess: () => {
                  navigate("/login");
                },
              });
            }}
          >
            Signup
          </Button>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-neutral-600 text-preset-5">
            Already have an account?
          </span>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
