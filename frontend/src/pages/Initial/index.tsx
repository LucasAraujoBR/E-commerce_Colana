import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlineButton, PrimaryButton } from "../../components/atoms";
import { InitialTemplate } from "../../components/organisms/loginTemplate";
import styles from "./styles.module.scss";

export function Initial() {
  const history = useNavigate();
  const handleClick = (screen: string) => {
    history(screen);
  };
  return (
    <InitialTemplate>
      <div className={styles.container}>
        <p className={styles.title}>Get House</p>
        <p className={styles.subtitle}>Seu lar mais perto</p>
        <div className={styles.form}>
          <PrimaryButton
            onClick={() => handleClick("/signup")}
            className={styles.marginBottom}
          >
            Cadastrar
          </PrimaryButton>
          <OutlineButton onClick={() => handleClick("/login")}>
            Entrar
          </OutlineButton>
        </div>
      </div>
    </InitialTemplate>
  );
}
