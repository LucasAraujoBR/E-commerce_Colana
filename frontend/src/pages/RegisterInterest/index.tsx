import { useState } from "react";
import { Input, PrimaryButton } from "../../components/atoms";
import { DashboardTemplate } from "../../components/organisms";
import { FirstStep, SecondStep } from "./components";
import styles from "./styles.module.scss";

export const RegisterInterests = () => {
  const [local, setLocal] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [furnished, setFurnished] = useState<boolean>(false);
  const [allowPets, setAllowPets] = useState<boolean>(false);
  const [pool, setPool] = useState<boolean>(false);
  const [morningSun, setMorningSun] = useState<boolean>(false);
  const [hasGuarantor, setHasGuarantor] = useState<boolean>(false);
  const [showSecondStep, setShowSecondStep] = useState<boolean>(false);

  const handleSubmit = () => {
    // submit
  };

  const enableButton = !!(local && size && price && type);
  return (
    <DashboardTemplate>
      <div className={styles.container}>
        <p className={styles.title}>Cadastrar Novo Interesse</p>
        {!showSecondStep ? (
          <FirstStep
            local={local}
            setLocal={setLocal}
            size={size}
            setSize={setSize}
            price={price}
            setPrice={setPrice}
            type={type}
            setType={setType}
            enableButton={enableButton}
            onClick={() => setShowSecondStep(true)}
          />
        ) : (
          <SecondStep
            furnished={furnished}
            setFurnished={setFurnished}
            allowPets={allowPets}
            setAllowPets={setAllowPets}
            pool={pool}
            setPool={setPool}
            hasGuarantor={hasGuarantor}
            setHasGuarantor={setHasGuarantor}
            morningSun={morningSun}
            setMorningSun={setMorningSun}
            onClick={handleSubmit}
            setShowSecondStep={setShowSecondStep}
          />
        )}
      </div>
    </DashboardTemplate>
  );
};
