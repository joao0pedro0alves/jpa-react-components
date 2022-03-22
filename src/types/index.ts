import React from "react";

export type FormInputLabel =
  | string
  | number
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export interface FormInputProps {
  /**
   * A required field name
   */
  name: Required<string>;
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: FormInputLabel;
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

export type Option = {
  /** Option value */
  value: any;

  /** Option content */
  label:
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;

  /** If `true`, the option is disabled. */
  disabled?: boolean;
};
