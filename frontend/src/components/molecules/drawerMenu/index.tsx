import { ReactNode } from 'react';
import styles from './styles.module.scss';

type DrawerMenuProps = {
  children: ReactNode;
};

export const DrawerMenu = ({ children }: DrawerMenuProps) => {
  return <div className={styles.drawerMenu}>{children}</div>;
};
