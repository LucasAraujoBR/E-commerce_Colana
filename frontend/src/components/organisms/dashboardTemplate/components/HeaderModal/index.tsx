import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { IcLogout, IcSearch } from '../../../../../assets';
import useInterest from '../../../../../stores/interests';
import useUser from '../../../../../stores/user';
import { DrawerMenu } from '../../../../molecules';
import styles from './styles.module.scss';

type HeaderProps = {
  toggleMenu?: () => void;
  className?: string;
  setShowModalMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderModal = ({ toggleMenu, setShowModalMenu }: HeaderProps) => {
  const history = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const { addUser, addIsOwner, isOwner } = useUser();
  const { addAllInterests, addMyInterests, myInterests } = useInterest();

  const signOut = async () => {
    removeCookie('token', { path: '/' });
    removeCookie('user', { path: '/' });
    addUser(undefined);
    addIsOwner(undefined);
    addAllInterests([]);
    addMyInterests([]);
    history('/login');
  };
  const pushToExplorer = () => {
    history('/explorer');
  };

  return (
    <div className={styles.header}>
      <div className={styles.right}>
        <div className={styles.overlay} onClick={() => setShowModalMenu(false)}>
          <div className={styles.drawerUser}>
            <DrawerMenu>
              <div className={styles.bottom}>
                {isOwner && (
                  <div className={styles.optionContainer}>
                    <img
                      width={20}
                      height={20}
                      src={IcSearch}
                      alt='search icon'
                    />
                    <span
                      onClick={pushToExplorer}
                      className={styles.optionMenu}
                    >
                      Buscar
                    </span>
                  </div>
                )}
                <div className={styles.optionContainer}>
                  <img
                    width={24}
                    height={24}
                    src={IcLogout}
                    alt='search icon'
                  />
                  <span onClick={signOut} className={styles.optionMenu}>
                    Sair
                  </span>
                </div>
              </div>
            </DrawerMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
