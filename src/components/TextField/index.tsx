import React from "react";
import { Mask } from "react-text-mask";
import TextMaskCustom from "../TextMaskCustom";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type TextFieldCustomProps = {
  /**
   * Use to create input `mask`
   *
   * Docs:
   *
   * - [ReactTextMask](https://github.com/text-mask/text-mask)
   */
  textMaskProps?: { mask: Mask | ((value: string) => Mask) };
} & TextFieldProps;

export const TextField: React.FC<TextFieldCustomProps> = ({
  textMaskProps,
  ...props
}) => {
  const getInputProps = () => {
    const InputProps = props.InputProps || {};
    if (textMaskProps) (InputProps.inputComponent as any) = TextMaskCustom;
    return InputProps;
  };

  return (
    <MuiTextField
      {...props}
      inputProps={{ ...props.inputProps, ...textMaskProps }}
      InputProps={{ ...getInputProps() }}
    />
  );
};

export default TextField;
