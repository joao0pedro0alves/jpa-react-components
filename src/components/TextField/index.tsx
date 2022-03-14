import React from "react";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

// import { Container } from './styles';

export const TextField: React.FC<TextFieldProps> = (props) => {
  return <MuiTextField {...props} />;
};

export default TextField;
