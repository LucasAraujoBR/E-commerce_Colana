import { ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IcLogo, IcUser } from "../../../assets";
import useUser from "../../../stores/user";
import { PrimaryButton } from "../../atoms";
import { HeaderModal } from "./components";
// import { Header } from 'components/organisms';
import styles from "./styles.module.scss";

type DashboardTemplateProps = {
  children: ReactNode;
};

export const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const [showModalMenu, setShowModalMenu] = useState<boolean>(false);
  const history = useNavigate();
  const [cookies] = useCookies(["user"]);
  const { user, addUser, addIsOwner, isOwner } = useUser();
  const url = window.location.href;

  useEffect(() => {
    if (!user && cookies?.user) {
      addUser(cookies?.user);
      addIsOwner(cookies?.user?.type === "proprietário");
    }
  }, []);

  const pushToRoute = (route: string) => {
    history(route);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img alt="Logo do get house" width={50} height={50} src={IcLogo} />
          <p
            onClick={() => pushToRoute("/dashboard")}
            className={
              url.includes("dashboard")
                ? styles.headerTitleSelected
                : styles.headerTitle
            }
          >
            {isOwner ? "Meus Imóveis" : "Meus Interesses"}
          </p>
          <p
            onClick={() => pushToRoute("/register-interest")}
            className={
              url.includes("register-interest")
                ? styles.headerTitleSelected
                : styles.headerTitle
            }
          >
            {isOwner ? "Cadastrar Imóvel" : "Cadastrar Interesse"}
          </p>
          <p
            onClick={() => pushToRoute("/matches")}
            className={
              url.includes("matches")
                ? styles.headerTitleSelected
                : styles.headerTitle
            }
          >
            Meus Matches
          </p>
        </div>
        <div className={styles.headerRight}>
          <PrimaryButton
            onClick={() => setShowModalMenu(true)}
            className={styles.primaryButton}
          >
            <img
              alt="Ícone de usuário"
              className={styles.userIcon}
              width={24}
              height={24}
              src={IcUser}
            />
            <p>{user?.name}</p>
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
