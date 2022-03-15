import React from "react";
import MuiButton, { ButtonProps } from "@mui/material/Button";
import { CircularProgress, CircularProgressProps } from "@mui/material";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type ButtonCustomProps = {
  /**
   * Control button loading state
   * @default 'false'
   */
  loading?: boolean;
  ProgressProps?: CircularProgressProps;
} & ButtonProps;

const PROGRESS_SIZE_LIST = {
  small: 20,
  medium: 25,
  large: 35,
};

/**
 * Docs:
 *
 *  - [MuiButton](https://mui.com/pt/components/buttons)
 *  - [MuiProgress](https://mui.com/pt/components/progress)
 */
export const Button: React.FC<ButtonCustomProps> = ({
  loading,
  ProgressProps,
  ...props
}) => {
  const getProgressContrastColor = () => {
    switch (props.variant) {
      case "contained":
        return "inherit";
      case "outlined":
      case "text":
        return props.color;
    }
  };

  const getProgressSize = () => PROGRESS_SIZE_LIST[props.size || "large"];

  return (
    <MuiButton {...props}>
      {loading ? (
        <CircularProgress
          {...ProgressProps}
          color={getProgressContrastColor()}
          size={getProgressSize()}
        />
      ) : (
        props.children
      )}
    </MuiButton>
  );
};

Button.defaultProps = {
  loading: false,
};

export default Button;
