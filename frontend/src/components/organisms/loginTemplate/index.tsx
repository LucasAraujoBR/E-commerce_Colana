import { ReactNode } from "react";
import { IcBackArrow, IcLogo } from "../../../assets";
import styles from "./styles.module.scss";

type InitialTemplateProps = {
  children: ReactNode;
  hasBackButton?: boolean;
  onClickBackButton?: () => void;
};

export const InitialTemplate = ({
  children,
  hasBackButton,
  onClickBackButton,
}: InitialTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <img
          src={IcLogo}
          alt="Get House Logotipo"
          width="453"
          height="453"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
      {hasBackButton && (
        <button onClick={onClickBackButton} className={styles.backButton}>
          <img alt="back arrow" src={IcBackArrow} width={14} height={14} />
        </button>
      )}
      {children}
    </div>
  );
};
