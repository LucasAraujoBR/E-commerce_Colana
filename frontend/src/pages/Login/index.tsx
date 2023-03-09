import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, PrimaryButton } from "../../components/atoms";
import { InitialTemplate } from "../../components/organisms/loginTemplate";
import { SignIn } from "../../services";
import styles from "./styles.module.scss";

export function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async () => {
    await SignIn({ email, password });
  };
  return (
    <InitialTemplate
      hasBackButton
      onClickBackButton={() => history("/initial")}
    >
      <div className={styles.container}>
        <p className={styles.title}>Entrar</p>
        <div className={styles.form}>
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            name="email"
          />
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            name="senha"
          />
        </div>
        <PrimaryButton onClick={handleSubmit}>Entrar</PrimaryButton>
      </div>
    </InitialTemplate>
  );
}
