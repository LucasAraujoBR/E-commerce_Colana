import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type InputProps = {
  onChange?: (arg0: any) => void;
  onClickOutside?: ({}: any) => void;
  value: string;
  name?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  rows?: number;
  inputClassName?: string;
  onInput?: React.FormEventHandler<HTMLInputElement> | undefined;
};

export const Input = ({
  onChange,
  value,
  name,
  placeholder,
  maxLength,
  required = false,
  type,
  disabled,
  autoFocus,
  onClickOutside,
  rows,
  inputClassName,
  onInput,
  ...props
}: InputProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <>
      <input
        className={[styles.input, inputClassName].join(" ")}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        name={name}
        type={type || "text"}
        autoCorrect="off"
        autoComplete="off"
        maxLength={maxLength || 220}
        disabled={disabled}
        autoFocus={autoFocus}
        onBlur={onClickOutside}
        onInput={onInput}
        {...props}
      />
    </>
  );
};
