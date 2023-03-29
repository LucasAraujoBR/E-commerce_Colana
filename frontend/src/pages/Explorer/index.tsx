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

export const Explorer = () => {
  const { user } = useUser();
  const { addAllInterests, addMyInterests, myInterests, allInterests } =
    useInterest();
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Interest[]>(allInterests);

  const handleSearch = (text: string) => {
    const termToSearch = text;
    setTerm(termToSearch);
    const options = {
      keys: ['place', 'size', 'value', 'type'],
    };
    const fuse = new Fuse(allInterests, options);
    const found = fuse.search(termToSearch).map((item) => item.item);
    if (text) {
      setResults(found);
    } else {
      setResults(allInterests);
    }
  };
  // "furnished",
  // "pets",
  // "pool",
  // "morning_sun",
  // "guarantor",

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
            {results?.map((interest: Interest) => {
              return <InterestCard key={interest?.id} interest={interest} />;
            })}
          </div>
        </div>
        <div className={styles.filterContainer}>
          <p className={styles.title}>Filtro</p>
          <Filter text={term} handleSearch={handleSearch} />
        </div>
      </div>
    </DashboardTemplate>
  );
};
