import React from "react";
import { useFormContext } from ".";

import { TextField, TextFieldCustomProps } from "../TextField";
import { Select, SelectCustomProps } from "../Select";
import { Combobox, ComboboxCustomProps } from "../Combobox";
import { Checkbox, CheckboxCustomProps } from "../Checkbox";
import { RadioGroup, RadioGroupCustomProps } from "../RadioGroup";
import { FileInput, FileInputCustomProps } from "../FileInput";
import { DatePicker, DatePickerCustomProps } from "../DatePicker";

type WithCurrentFormProps<InputProps> = {
  name: string;
  separationChar?: string;
  disabled?: boolean;
  /**
   * Optional function called after form state change, can be used to change other form values
   */
  onAfterChange?: (value: any, name: string, values: object) => void;
} & InputProps;

function withCurrentForm<InputProps>(Component: any) {
  const WithCurrentForm = ({
    name,
    disabled,
    separationChar,
    onAfterChange,
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
            ? onChangeValue(separationChar, onAfterChange)
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
export const FormDatePicker =
  withCurrentForm<DatePickerCustomProps>(DatePicker);
export const FormSelect = withCurrentForm<SelectCustomProps>(Select);
export const FormCombobox = withCurrentForm<ComboboxCustomProps>(Combobox);
export const FormFileInput = withCurrentForm<FileInputCustomProps>(FileInput);
