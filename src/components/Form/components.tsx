import React from "react";
import { useFormContext } from ".";

import TextField from "../TextField";
import { TextFieldProps } from "@mui/material";

type WithCurrentFormProps<InputProps> = {
  name: string;
  separationChar?: string;
  disabled?: boolean;
} & InputProps;

function withCurrentForm<InputProps>(Component: any) {
  const WithCurrentForm = ({
    name,
    separationChar,
    disabled,
    ...props
  }: WithCurrentFormProps<InputProps>) => {
    const formContext = useFormContext();
    if (formContext) {
      const { errors, getFieldValue, onChangeValue, isReadOnlyForm } =
        formContext;

      const value = getFieldValue(name, separationChar);
      const errorMessage = (errors as any)[name];
      const withError = Boolean(errorMessage);

      return (
        <Component
          name={name}
          value={value}
          disabled={Boolean(isReadOnlyForm || disabled)}
          error={withError}
          helperText={errorMessage}
          onChange={onChangeValue(separationChar)}
          {...props}
        />
      );
    } else return null;
  };

  WithCurrentForm.WrappedComponent = Component;
  return WithCurrentForm;
}

// ℂ𝕠𝕞𝕡𝕠𝕟𝕖𝕟𝕥𝕤

export const FormTextField = withCurrentForm<TextFieldProps>(TextField);
