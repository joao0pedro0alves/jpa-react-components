import React from "react";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

type MaskedInputCustomProps = MaskedInputProps | Readonly<MaskedInputProps>;

/**
 * Docs:
 *
 * - [ReactTextMask](https://github.com/text-mask/text-mask/tree/master/react/#readme)
 */
export const TextMaskCustom = React.forwardRef(
  (props: MaskedInputCustomProps, ref) => (
    <MaskedInput ref={undefined} placeholderChar={"\u2000"} {...props} />
  )
);

export default TextMaskCustom;
