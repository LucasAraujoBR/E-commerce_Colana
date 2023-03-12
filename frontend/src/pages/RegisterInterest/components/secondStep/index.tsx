import { IcBackArrow } from "../../../../assets";
import { BackButton, Input, PrimaryButton } from "../../../../components/atoms";
import styles from "./styles.module.scss";

type SecondStepProps = {
  onClick: () => void;
  furnished: boolean;
  allowPets: boolean;
  pool: boolean;
  morningSun: boolean;
  hasGuarantor: boolean;
  setFurnished: React.Dispatch<React.SetStateAction<boolean>>;
  setHasGuarantor: React.Dispatch<React.SetStateAction<boolean>>;
  setAllowPets: React.Dispatch<React.SetStateAction<boolean>>;
  setPool: React.Dispatch<React.SetStateAction<boolean>>;
  setMorningSun: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SecondStep = ({
  furnished,
  allowPets,
  pool,
  morningSun,
  hasGuarantor,
  setFurnished,
  setAllowPets,
  setPool,
  setMorningSun,
  setHasGuarantor,
  setShowSecondStep,
  onClick,
}: SecondStepProps) => {
  return (
    <div className={styles.form}>
      <>
        <BackButton onClick={() => setShowSecondStep(false)} />
        <p className={styles.subtitle}>Últimos detalhes</p>
      </>
      <div className={styles.selectionContainer}>
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            checked={furnished}
            type="checkbox"
            onChange={(e) => setFurnished(e.target.checked)}
            id="furnished"
          />
          <p>Mobiliado</p>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            checked={allowPets}
            type="checkbox"
            onChange={(e) => setAllowPets(e.target.checked)}
            id="allowPets"
          />
          <p>Aceita Pets</p>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            checked={pool}
            type="checkbox"
            onChange={(e) => setPool(e.target.checked)}
            id="pool"
          />
          <p>Com Psicina</p>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            checked={morningSun}
            type="checkbox"
            onChange={(e) => setMorningSun(e.target.checked)}
            id="morningSun"
          />
          <p>Sol da manhã</p>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            checked={hasGuarantor}
            type="checkbox"
            onChange={(e) => setHasGuarantor(e.target.checked)}
          />
          <p>Tenho Fiador</p>
        </div>
      </div>
      <PrimaryButton onClick={onClick}>Salvar</PrimaryButton>
    </div>
  );
};
