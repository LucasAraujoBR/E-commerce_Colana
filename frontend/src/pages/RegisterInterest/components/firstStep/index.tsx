import { ChangeEventHandler } from "react";
import { IcAddImage } from "../../../../assets";
import { Input, PrimaryButton } from "../../../../components/atoms";
import useUser from "../../../../stores/user";
import { moneyMask } from "../../../../utils";
import styles from "./styles.module.scss";

type FirstStepProps = {
  enableButton: boolean | undefined;
  onClick: () => void;
  place: string;
  size: string;
  price: string;
  type: string;
  src?: string;
  onChangeFile: ChangeEventHandler<HTMLInputElement>;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export const FirstStep = ({
  place,
  setPlace,
  size,
  setSize,
  price,
  setPrice,
  type,
  src,
  setType,
  enableButton,
  onClick,
  onChangeFile,
}: FirstStepProps) => {
  const { user, isOwner } = useUser();
  return (
    <div className={isOwner ? styles.formOwner : styles.form}>
      <div className={styles.selectionContainer}>
        {isOwner && (
          <label className={styles.inputContainer}>
            <input
              hidden
              accept=".jpg, .jpeg, .png"
              type="file"
              onChange={onChangeFile}
              name="teste"
            />
            <img
              width={src ? 101 : 40}
              height={src ? 85 : 40}
              style={{ borderRadius: src ? "15px" : "" }}
              src={src || IcAddImage}
              alt="Adicionar imagem"
            />
          </label>
        )}
        {isOwner && <p className={styles.addImage}>Adicionar imagem</p>}
        {/* <Input
          placeholder="Alugar ou Comprar"
          value={rent}
          onChange={setRent}
          name="rent"
        /> */}
        <Input
          maxLength={45}
          placeholder="Local (Bairro, cidade ou estado)"
          value={place}
          onChange={setPlace}
          name="local"
        />
        <Input
          onInput={(e) =>
            ((e.target as HTMLButtonElement).value = (
              e.target as HTMLButtonElement
            ).value.slice(0, 4))
          }
          placeholder="Tamanho (em m²)"
          type="number"
          value={size}
          onChange={setSize}
          name="size"
        />
        <Input
          maxLength={12}
          placeholder="Valor"
          value={price ? moneyMask(price) : ""}
          onChange={setPrice}
          name="price"
        />
        <div className={styles.typeContainer}>
          <p className={styles.typeTitle}>Tipo do imóvel</p>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              checked={type === "casa"}
              type="checkbox"
              onChange={(e) =>
                setType(e.target.checked ? "casa" : "apartamento")
              }
              id="allowPets"
            />
            <p>casa</p>
          </div>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              checked={type === "apartamento"}
              type="checkbox"
              onChange={(e) =>
                setType(!e.target.checked ? "casa" : "apartamento")
              }
              id="pool"
            />
            <p>apartamento</p>
          </div>
        </div>
        {/* <Input
          placeholder="Tipo (Casa, Apartamento, etc.)"
          value={type}
          onChange={setType}
          name="type"
        /> */}
      </div>
      <PrimaryButton onClick={onClick} disabled={!enableButton}>
        Próximo
      </PrimaryButton>
    </div>
  );
};
