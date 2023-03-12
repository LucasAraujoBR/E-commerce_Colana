import { InterestCard } from "../../components/molecules";
import { DashboardTemplate } from "../../components/organisms";
import styles from "./styles.module.scss";

export const Dashboard = () => {
  return (
    <DashboardTemplate>
      <div className={styles.container}>
        <p className={styles.title}>Seus interesses cadastrados</p>
        <div className={styles.cardContainer}>
          <InterestCard title="teste" />
          <InterestCard title="teste" />
          <InterestCard title="teste" />
          <InterestCard title="teste" />
          <InterestCard title="teste" />
        </div>
      </div>
    </DashboardTemplate>
  );
};
