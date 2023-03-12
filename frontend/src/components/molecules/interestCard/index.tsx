import React from "react";
import { IcLogo } from "../../../assets";
import styles from "./styles.module.scss";

type InterestCardProps = {
  title?: string;
};

export const InterestCard = ({ title }: InterestCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={IcLogo} alt="Logo do Get house" />
      </div>
      <div className={styles.containerInfos}>
        <div className={styles.internalInfos}>
          <p className={styles.info}>Procura: Teste</p>
          <p className={styles.info}>Procura: Teste</p>
          <p className={styles.info}>Procura: Aluguel</p>
          <p className={styles.info}>Procura: Aluguel</p>
          <p className={styles.info}>Procura: Aluguel</p>
        </div>
        <div className={styles.internalInfos}>
          <p className={styles.info}>Procura: Aluguel</p>
          <p className={styles.info}>Sol da manhã: Sim</p>
          <p className={styles.info}>Procura: Aluguel</p>
          <p className={styles.info}>Procura: Aluguel</p>
          <p className={styles.info}>Procura: Aluguel</p>
        </div>
      </div>
      <div className={styles.footerInfos}>
        <p className={styles.editButton}>editar</p>
        <p className={styles.deleteButton}>excluir</p>
      </div>
    </div>
  );
};
