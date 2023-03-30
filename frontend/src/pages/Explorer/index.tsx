import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Filter, InterestCard } from '../../components/molecules';
import { DashboardTemplate } from '../../components/organisms';
import { GetInterests } from '../../services/interests';
import useInterest from '../../stores/interests';
import useUser from '../../stores/user';
import { Interest } from '../../types';
import styles from './styles.module.scss';

export type SelectedOptions = {
  furnished: boolean;
  pets: boolean;
  pool: boolean;
  morning_sun: boolean;
  guarantor: boolean;
};

export const Explorer = () => {
  const { user } = useUser();
  const { addAllInterests, addMyInterests, myInterests, allInterests } =
    useInterest();
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Interest[]>(allInterests);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    furnished: false,
    pets: false,
    pool: false,
    morning_sun: false,
    guarantor: false,
  });
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [id]: checked,
    }));
  };

  useEffect(() => {
    const found = (term ? results : allInterests).filter(
      (interest: Interest) => {
        return Object.entries(selectedOptions).every(
          ([key, value]) => !value || interest[key] === true
        );
      }
    );
    setResults(found);
  }, [term, selectedOptions]);

  const handleSearch = (text: string) => {
    const termToSearch = text;
    setTerm(termToSearch);
    const options = {
      keys: ['place', 'size', 'value', 'type'],
    };
    const fuse = new Fuse(results || allInterests, options);
    const found = fuse.search(termToSearch).map((item) => item.item);
    if (text) {
      setResults(found);
    } else {
      setResults(allInterests);
    }
  };

  useEffect(() => {
    setResults(allInterests);
  }, [allInterests]);

  const [cookies] = useCookies(['token']);
  const fetchInterests = () =>
    GetInterests({ client_id: user?.id || '', token: cookies.token }).then(
      (resp) => {
        const filteredAllInterests = resp?.filter(
          (interest: Interest) => interest?.client_id !== user?.id
        );
        addAllInterests(filteredAllInterests);
      }
    );

  useEffect(() => {
    !allInterests.length && fetchInterests();
  }, [user]);

  return (
    <DashboardTemplate>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.title}>Interesses dos usuários</p>
          <div className={styles.cardContainer}>
            {results?.length ? (
              results?.map((interest: Interest) => {
                return (
                  <InterestCard
                    isMatch
                    key={interest?.id}
                    interest={interest}
                  />
                );
              })
            ) : (
              <p>Nenhum interesse encontrado.</p>
            )}
          </div>
        </div>
        <div className={styles.filterContainer}>
          <p className={styles.filterTitle}>Filtro</p>
          <Filter
            selectedOptions={selectedOptions}
            handleCheckboxChange={handleCheckboxChange}
            text={term}
            handleSearch={handleSearch}
          />
        </div>
      </div>
    </DashboardTemplate>
  );
};
