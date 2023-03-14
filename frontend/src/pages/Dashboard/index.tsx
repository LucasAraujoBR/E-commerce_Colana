import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { InterestCard } from "../../components/molecules";
import { DashboardTemplate } from "../../components/organisms";
import { GetInterests } from "../../services/interests";
import useUser from "../../stores/user";
import { Interest } from "../../types";
import styles from "./styles.module.scss";

export const Dashboard = () => {
  const [interests, setInterests] = useState<any>([]);
  const { user } = useUser();
  const [cookies] = useCookies(["token"]);
  let fetchInterests = () =>
    GetInterests({ client_id: user?.id || "", token: cookies.token }).then(
      (resp) => {
        setInterests(resp);
      }
    );

  useEffect(() => {
    fetchInterests();
  }, []);
  return (
    <DashboardTemplate>
      <div className={styles.container}>
        <p className={styles.title}>
          {interests.length
            ? "Seus interesses cadastrados"
            : "Você ainda não possui Interesses cadastrados."}
        </p>
        <div className={styles.cardContainer}>
          {interests?.map((interest: Interest) => {
            return (
              <InterestCard
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
