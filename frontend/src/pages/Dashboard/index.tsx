import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { InterestCard } from '../../components/molecules';
import { DashboardTemplate } from '../../components/organisms';
import { GetInterests } from '../../services/interests';
import useInterest from '../../stores/interests';
import useUser from '../../stores/user';
import { Interest } from '../../types';
import styles from './styles.module.scss';

export const Dashboard = () => {
  const { user, isOwner } = useUser();
  const { addAllInterests, addMyInterests, myInterests } = useInterest();
  const [cookies] = useCookies(['token']);
  const fetchInterests = () =>
    GetInterests({ client_id: user?.id || '', token: cookies.token }).then(
      (resp) => {
        const filteredAllInterests = resp?.filter(
          (interest: Interest) => interest?.client_id !== user?.id
        );
        addAllInterests(filteredAllInterests);
        const filteredInterests = resp?.filter(
          (inte: Interest) => inte.client_id === user?.id
        );
        addMyInterests(filteredInterests);
      }
    );

  useEffect(() => {
    fetchInterests();
  }, [user]);

  return (
    <DashboardTemplate>
      <div className={styles.container}>
        <p className={styles.title}>
          {myInterests.length
            ? isOwner
              ? 'Seus imóveis cadastrados'
              : 'Seus interesses cadastrados'
            : 'Você ainda não possui Interesses cadastrados.'}
        </p>
        <div className={styles.cardContainer}>
          {myInterests?.map((interest: Interest) => {
            return (
              <InterestCard
                key={interest?.id}
                fetchInterest={fetchInterests}
                interest={interest}
              />
            );
          })}
        </div>
      </div>
    </DashboardTemplate>
  );
};
