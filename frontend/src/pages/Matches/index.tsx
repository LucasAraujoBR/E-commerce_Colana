import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { InterestCard } from '../../components/molecules';
import { DashboardTemplate } from '../../components/organisms';
import { GetUser } from '../../services';
import { fetchInterests, GetInterests } from '../../services/interests';
import useInterest from '../../stores/interests';
import useUser from '../../stores/user';
import { Interest } from '../../types';
import styles from './styles.module.scss';

export const Matches = () => {
  const [matches, setMatches] = useState<Interest[] | undefined>();
  // const [matchPoints, setMatchPoints] = useState<number>(0);
  const { user } = useUser();
  const { addAllInterests, addMyInterests, myInterests, allInterests } =
    useInterest();
  const [cookies] = useCookies(['token']);

  const doMatch = (myInterest: Interest, interestToCompare: Interest) => {
    let matchPoints = 0;
    if (myInterest.furnished === interestToCompare.furnished) matchPoints++;
    if (myInterest.guarantor === interestToCompare.guarantor) matchPoints++;
    if (myInterest.morning_sun === interestToCompare.morning_sun) matchPoints++;
    if (myInterest.pets === interestToCompare.pets) matchPoints++;
    if (myInterest.place === interestToCompare.place) matchPoints++;
    if (myInterest.pool === interestToCompare.pool) matchPoints++;
    if (myInterest.type === interestToCompare.type) matchPoints++;
    if (myInterest.place === interestToCompare.place) matchPoints++;
    if (myInterest.value >= interestToCompare.value) matchPoints++;
    if (Math.abs(Number(myInterest.size) - Number(interestToCompare.size)) < 10)
      matchPoints++;

    return matchPoints;
  };

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
    GetUser({ id: user?.id }).then((resp) => {});
  }, [user]);

  useEffect(() => {
    const treshold = 4;
    const filteredMatches = allInterests.filter((interest) => {
      return myInterests.find((myInterest) => {
        if (user?.type === 'inquilino') {
          if (interest?.file) {
            const matchPoints = doMatch(myInterest, interest);
            if (matchPoints >= treshold) {
              return myInterest;
            }
          }
        } else {
          const matchPoints = doMatch(myInterest, interest);
          if (matchPoints >= treshold) {
            return myInterest;
          }
        }
      });
    });
    setMatches(filteredMatches);
  }, [allInterests]);

  return (
    <DashboardTemplate>
      <div className={styles.container}>
        {matches?.length ? (
          <div>
            <span className={styles.title}>Deu</span>
            <span className={styles.titleRed}> Match!</span>
          </div>
        ) : (
          <span className={styles.title}>Você ainda não possui Matches.</span>
        )}
        {!!matches?.length && (
          <p className={styles.subtitle}>
            {user?.type === 'proprietário'
              ? 'Aqui você encontra características em comum entre seus Imóveis e interesses de outros usuários.'
              : 'Aqui você encontra características em comum entre seus Interesses e imóveis de proprietários.'}
          </p>
        )}
        <div className={styles.cardContainer}>
          {matches?.map((interest: Interest) => {
            return (
              <InterestCard isMatch key={interest?.id} interest={interest} />
            );
          })}
        </div>
      </div>
    </DashboardTemplate>
  );
};
