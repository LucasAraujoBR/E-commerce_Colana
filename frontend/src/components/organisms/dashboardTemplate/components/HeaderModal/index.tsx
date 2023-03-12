import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { DrawerMenu } from "../../../../molecules";
import styles from "./styles.module.scss";

type HeaderProps = {
  toggleMenu?: () => void;
  className?: string;
  setShowModalMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderModal = ({ toggleMenu, setShowModalMenu }: HeaderProps) => {
  const history = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);

  const signOut = async () => {
    removeCookie("token", { path: "/" });
    removeCookie("user", { path: "/" });
    history("/login");
  };

  // const handleInit = () => {
  //   router.push('/dashboard');
  // };

  return (
    <div className={styles.header}>
      <div className={styles.right}>
        <div className={styles.overlay} onClick={() => setShowModalMenu(false)}>
          <div className={styles.drawerUser}>
            <DrawerMenu>
              <div className={styles.bottom}>
                <p className={styles.optionMenu}>Configurações</p>
                <p onClick={signOut} className={styles.optionMenu}>
                  Sair
                </p>
              </div>
            </DrawerMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
