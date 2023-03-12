import { Input, PrimaryButton } from "../../../../components/atoms";
import styles from "./styles.module.scss";

type FirstStepProps = {
  enableButton: boolean | undefined;
  onClick: () => void;
  local: string;
  size: string;
  price: string;
  type: string;
  setLocal: React.Dispatch<React.SetStateAction<string>>;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export const FirstStep = ({
  local,
  setLocal,
  size,
  setSize,
  price,
  setPrice,
  type,
  setType,
  enableButton,
  onClick,
}: FirstStepProps) => {
  return (
    <div className={styles.form}>
      <div className={styles.selectionContainer}>
        <Input
          placeholder="Local (Bairro, cidade ou estado)"
          value={local}
          onChange={setLocal}
          name="local"
        />
        <Input
          placeholder="Tamanho (em m²)"
          value={size}
          onChange={setSize}
          name="size"
        />
        <Input
          placeholder="Valor"
          value={price}
          onChange={setPrice}
          name="price"
        />
        <Input
          placeholder="Tipo (Casa, Apartamento, etc.)"
          value={type}
          onChange={setType}
          name="type"
        />
      </div>
      <PrimaryButton onClick={onClick} disabled={!enableButton}>
        Próximo
      </PrimaryButton>
    </div>
  );
};
