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

  const signOut = async () => {
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
              <div onClick={signOut} className={styles.bottom}>
                <p className={styles.optionMenu}>Configurações</p>
                <p className={styles.optionMenu}>Sair</p>
              </div>
            </DrawerMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
