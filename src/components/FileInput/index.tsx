import React from "react";
import { Typography, AvatarProps } from "@mui/material";
import { Container, StyledInputLabel } from "./styles";
import filesize from "filesize";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export interface ReadedFile {
  /**
   * File converted in `Base64` string
   */
  file: string;
  name: string;
  mimetype: string;
  formattedSize: string;
  size: number;
}

export type FileInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  value?: ReadedFile | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, file: ReadedFile) => void;
  AvatarProps?: AvatarProps;
};

export const FileInput: React.FC<FileInputProps> = ({
  label,
  AvatarProps,
  ...props
}) => {
  const dataFile = props.value ? props.value.file : undefined;

  const fileReader = (file: globalThis.File) => {
    const readedFile = new Promise<ReadedFile>((response) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        response({
          file: fileReader.result as string,
          name: file.name,
          size: file.size,
          formattedSize: filesize(file.size),
          mimetype: file.type,
        });
      });

      fileReader.readAsDataURL(file);
    });

    return readedFile;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && typeof props.onChange === "function") {
      const readedFile = await fileReader(e.target.files[0]);
      props.onChange(e, readedFile);
    }
  };

  return (
    <Container>
      <StyledInputLabel>
        {label && <Typography variant="button">{label}</Typography>}
        <input
          {...props}
          value=""
          type="file"
          accept="image/*"
          onChange={handleChange}
          data-file={dataFile}
          multiple={false}
        />
      </StyledInputLabel>
    </Container>
  );
};

export default FileInput;
