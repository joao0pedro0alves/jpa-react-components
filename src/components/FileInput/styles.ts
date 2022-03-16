import styled from "styled-components";
import { InputLabel } from "@mui/material";

export const Container = styled.div`
  margin: 0;
`;

export const StyledInputLabel = styled(InputLabel)`
  margin: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;

  &.Mui-disabled {
    pointer-events: none;
  }

  input {
    display: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;
