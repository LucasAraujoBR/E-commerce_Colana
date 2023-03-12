import { IcBackArrow } from "../../../assets";
import styles from "./styles.module.scss";

type BackButtonProps = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button onClick={onClick} className={styles.backButton}>
      <img alt="Ícone de seta" src={IcBackArrow} width={14} height={14} />
    </button>
  );
};
