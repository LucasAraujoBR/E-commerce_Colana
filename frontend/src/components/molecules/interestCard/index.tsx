import React from 'react';
import { useCookies } from 'react-cookie';
import { IcLogo, IcWhatsApp } from '../../../assets';
import { GetUser } from '../../../services';
import { RemoveInterest } from '../../../services/interests';
import { Interest } from '../../../types';
import { moneyMask } from '../../../utils';
import styles from './styles.module.scss';

type InterestCardProps = {
  interest: Interest;
  fetchInterest?: () => Promise<void>;
  isMatch?: boolean;
};

export const InterestCard = ({
  interest,
  fetchInterest,
  isMatch,
}: InterestCardProps) => {
  const [cookies] = useCookies(['token']);
  const deleteInterest = async () => {
    await RemoveInterest({ id: interest?.id || '', token: cookies.token });
    fetchInterest && fetchInterest();
  };

  const openWhatsapp = async () => {
    const userById = await GetUser({ id: interest?.client_id || '' });
    const phoneNumber = '55' + userById?.phone;
    const url = ` https://wa.me/?phone=55${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div key={interest?.id} className={styles.container}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={interest?.file || IcLogo}
          alt='Imagem da casa'
        />
      </div>
      <div className={styles.containerInfos}>
        <div className={styles.internalInfos}>
          <p className={styles.info}>Procura: Aluguel</p>
          <p className={styles.info}>Local: {interest?.place}</p>
          <p className={styles.info}>Tamanho: {interest?.size}m2</p>
          <p className={styles.info}>Valor: {moneyMask(interest?.value)}</p>
          <p className={styles.info}>Tipo: {interest?.type}</p>
        </div>
        <div className={styles.internalInfos}>
          <p className={styles.info}>
            Mobiliado: {interest?.furnished ? 'Sim' : 'Não'}
          </p>
          <p className={styles.info}>
            Aceita pets: {interest?.pets ? 'Sim' : 'Não'}
          </p>
          <p className={styles.info}>
            Piscina: {interest?.pool ? 'Sim' : 'Não'}
          </p>
          <p className={styles.info}>
            Sol da manhã: {interest?.morning_sun ? 'Sim' : 'Não'}
          </p>
          <p className={styles.info}>
            Tem fiador: {interest?.guarantor ? 'Sim' : 'Não'}
          </p>
        </div>
      </div>
      {!isMatch ? (
        <div className={styles.footerInfos}>
          <p className={styles.editButton}>editar</p>
          <p onClick={deleteInterest} className={styles.deleteButton}>
            excluir
          </p>
        </div>
      ) : (
        <div onClick={openWhatsapp} className={styles.footerInfosWpp}>
          <p className={styles.whatsapp}>Chamar no WhatsApp</p>
          <img src={IcWhatsApp} alt='icone do whatsapp' />
        </div>
      )}
    </div>
  );
};
