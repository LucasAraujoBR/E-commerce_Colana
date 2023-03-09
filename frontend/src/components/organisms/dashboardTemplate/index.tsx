import { ReactNode, useState } from "react";
import { IcLogo, IcUser } from "../../../assets";
import { PrimaryButton } from "../../atoms";
import { HeaderModal } from "./components";
// import { Header } from 'components/organisms';
import styles from "./styles.module.scss";

type DashboardTemplateProps = {
  children: ReactNode;
};

export const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const [showModalMenu, setShowModalMenu] = useState<boolean>(false);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img width={50} height={50} src={IcLogo} />
          <p className={styles.headerTitleSelected}>Meus Interesses</p>
          <p className={styles.headerTitle}>Cadastrar Interesse</p>
          <p className={styles.headerTitle}>Meus Matches</p>
        </div>
        <div className={styles.headerRight}>
          <PrimaryButton
            onClick={() => setShowModalMenu(true)}
            className={styles.primaryButton}
          >
            <img
              className={styles.userIcon}
              width={24}
              height={24}
              src={IcUser}
            />
            <p>Username</p>
          </PrimaryButton>
        </div>
        {showModalMenu && <HeaderModal setShowModalMenu={setShowModalMenu} />}
        {/* <Header
          handleCreateShort={handleCreateShort}
          toggleMenu={() => {
            setOpenDrawer(!openDrawer);
          }}
        /> */}
      </div>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
