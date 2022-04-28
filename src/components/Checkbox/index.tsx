import React from "react";
import {
  FormHelperText,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material";
import { FormInputProps } from "../../types";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type CheckboxCustomProps = MuiCheckboxProps & FormInputProps;

export const Checkbox: React.FC<CheckboxCustomProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  return (
    <>
      <FormControlLabel
        label={label}
        control={<MuiCheckbox checked={!!props.value} {...props} />}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </>
  );
};

export default Checkbox;
