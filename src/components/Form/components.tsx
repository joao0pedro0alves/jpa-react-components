import React from "react";
import { useFormContext } from ".";

import { TextField, TextFieldCustomProps } from "../TextField";
import { Checkbox, CheckboxCustomProps } from "../Checkbox";
import { RadioGroup, RadioGroupCustomProps } from "../RadioGroup";

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

    const errors = formContext?.errors;
    const isReadOnlyForm = formContext?.isReadOnlyForm;
    const getFieldValue = formContext?.getFieldValue;
    const onChangeValue = formContext?.onChangeValue;

    const value =
      typeof getFieldValue === "function"
        ? getFieldValue(name, separationChar)
        : "";

    const errorMessage = (errors as any)[name];
    const withError = Boolean(errorMessage);

    return (
      <Component
        name={name}
        // Fixes Warning: A component is changing an uncontrolled input to be controlled.
        value={value || ""}
        disabled={Boolean(isReadOnlyForm || disabled)}
        error={withError}
        helperText={errorMessage}
        onChange={
          typeof onChangeValue === "function"
            ? onChangeValue(separationChar)
            : undefined
        }
        {...props}
      />
    );
  };

  WithCurrentForm.WrappedComponent = Component;
  return WithCurrentForm;
}

// --------------- ℂ𝕠𝕞𝕡𝕠𝕟𝕖𝕟𝕥𝕤 ---------------

export const FormTextField = withCurrentForm<TextFieldCustomProps>(TextField);
export const FormCheckbox = withCurrentForm<CheckboxCustomProps>(Checkbox);
export const FormRadioGroup =
  withCurrentForm<RadioGroupCustomProps>(RadioGroup);
