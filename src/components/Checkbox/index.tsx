import React from "react";
import { FormHelperText, CheckboxProps } from "@mui/material";
import { StyledFormControlLabel, StyledCheckbox } from "./styles";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type CheckboxCustomProps = {
  label: string;
  error?: boolean;
  helperText?: string;
} & CheckboxProps;

export const Checkbox: React.FC<CheckboxCustomProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  return (
    <>
      <StyledFormControlLabel
        label={label}
        control={<StyledCheckbox {...props} />}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </>
  );
};

export default Checkbox;
