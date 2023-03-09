import { DashboardTemplate } from "../../components/organisms";
import styles from "./styles.module.scss";

export const Dashboard = () => {
  return (
    <DashboardTemplate>
      <div className={styles.container}>Dashboard</div>
    </DashboardTemplate>
  );
};
