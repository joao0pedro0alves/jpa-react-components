import React from "react";

export interface FormInputProps {
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label:
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  /**
   * If `true`, the label is displayed in an error state.
   * @default `false`
   */
  error?: boolean;
  /**
   * The helper text content.
   */
  helperText?: string | React.ReactNode;
}
