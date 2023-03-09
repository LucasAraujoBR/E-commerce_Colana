import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.scss";

type ButtonTypes = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  isLoading?: boolean;
} & ButtonTypes;

export const PrimaryButton = ({
  children,
  disabled,
  isLoading = false,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <div />
          <div />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export const NegativeButton = ({
  children,
  disabled,
  isLoading = false,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${styles.negativeButton} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <div />
          <div />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export const OutlineButton = ({
  className,
  children,
  disabled,
  isLoading = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${styles.outlineButton} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <div />
          <div />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
