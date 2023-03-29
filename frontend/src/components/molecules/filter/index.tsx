import { ReactNode } from 'react';
import { Input } from '../../atoms';
import styles from './styles.module.scss';

type FilterProps = {
  handleSearch: (text: string) => void;
  text: string;
};

export const Filter = ({ handleSearch, text }: FilterProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input
          placeholder='Pesquisar'
          value={text}
          type='text'
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};
