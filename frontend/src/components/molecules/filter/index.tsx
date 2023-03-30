import { ReactNode, useEffect, useState } from 'react';
import { IcFilter } from '../../../assets';
import { SelectedOptions } from '../../../pages';
import { Input } from '../../atoms';
import styles from './styles.module.scss';

type FilterProps = {
  handleSearch: (text: string) => void;
  text: string;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOptions: SelectedOptions;
};

export const Filter = ({
  handleSearch,
  text,
  selectedOptions,
  handleCheckboxChange,
}: FilterProps) => {
  const [showFilterIcon, setShowFilterIcon] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleChangeTransition = () => {
    if (window.innerWidth <= 768) {
      setShowFilterIcon(true);
      setIsOpen(false);
    } else {
      setShowFilterIcon(false);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleChangeTransition);
  }, []);

  useEffect(() => {
    setShowFilterIcon(window.innerWidth <= 768);
  }, []);
  return (
    <>
      {showFilterIcon && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={styles.filterIconContainer}
        >
          <img src={IcFilter} width={30} height={30} />
        </div>
      )}
      <div className={`${styles.container} ${isOpen && styles.open}`}>
        <div className={styles.searchContainer}>
          <Input
            placeholder='Pesquisar'
            value={text}
            type='text'
            onChange={handleSearch}
          />
          <div className={styles.selectionContainer}>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                checked={selectedOptions.furnished}
                type='checkbox'
                onChange={handleCheckboxChange}
                id='furnished'
              />
              <p>Mobiliado</p>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                checked={selectedOptions.pets}
                type='checkbox'
                onChange={handleCheckboxChange}
                id='pets'
              />
              <p>Aceita Pets</p>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                checked={selectedOptions.pool}
                type='checkbox'
                onChange={handleCheckboxChange}
                id='pool'
              />
              <p>Com Psicina</p>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                checked={selectedOptions.morning_sun}
                type='checkbox'
                onChange={handleCheckboxChange}
                id='morning_sun'
              />
              <p>Sol da manhã</p>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                checked={selectedOptions.guarantor}
                type='checkbox'
                onChange={handleCheckboxChange}
                id='guarantor'
              />
              <p>Tenho Fiador</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
