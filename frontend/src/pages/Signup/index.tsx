import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IcEyeOpen } from "../../assets";
import { Input, PrimaryButton } from "../../components/atoms";
import { InitialTemplate } from "../../components/organisms/loginTemplate";
import { CreateUser } from "../../services";
import { phoneMask } from "../../utils";
import styles from "./styles.module.scss";

export function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isRenter, setIsRenter] = useState<boolean>(true);
  const enableButton =
    email &&
    name &&
    whatsapp &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    whatsapp.length >= 15;

  const handleSubmit = async () => {
    const submitUser = {
      email,
      password,
      is_verified: true,
      is_active: true,
      type: isRenter ? "inquilino" : "proprietário",
      name,
      phone: whatsapp,
      rg: "",
      cpf: "",
      address: "",
    };
    const resp = await CreateUser(submitUser);
    if (!resp.error) {
      toast.success("Usuário cadastrado. Faça login para iniciar :)");
      setTimeout(() => {
        history("/login");
      }, 2000);
    } else {
      toast.error("Algo deu errado ): tente novamente");
    }
    // submit
  };

  const changeSelection = (renterSelected: boolean) => {
    if (renterSelected) {
      setIsRenter(true);
    } else {
      setIsRenter(false);
    }
  };

  return (
    <InitialTemplate
      hasBackButton
      onClickBackButton={() => history("/initial")}
    >
      <div className={styles.container}>
        <p className={styles.title}>Cadastro</p>
        <div className={styles.form}>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={setEmail}
            name="email"
          />
          <Input
            placeholder="Nome"
            value={name}
            onChange={setName}
            name="nome"
          />
          <Input
            placeholder="WhatsApp"
            value={phoneMask(whatsapp)}
            onChange={setWhatsapp}
            name="whatsapp"
          />
          <Input
            placeholder="Senha"
            type={"password"}
            value={password}
            onChange={setPassword}
            name="senha"
          />
          <Input
            placeholder="Repetir senha"
            type={"password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            name="repetirSenha"
          />
          {password !== confirmPassword && (
            <span className={styles.warning}>as senhas devem ser iguais</span>
          )}
        </div>
        <div className={styles.selectionContainer}>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              checked={isRenter}
              type="checkbox"
              onChange={() => changeSelection(true)}
            />
            <p>Quero alugar ou comprar</p>
          </div>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              checked={!isRenter}
              type="checkbox"
              onChange={() => changeSelection(false)}
            />
            <p>Quero oferecer um imóvel</p>
          </div>
        </div>
        <PrimaryButton
          className={styles.marginTop}
          disabled={!enableButton}
          onClick={handleSubmit}
        >
          Cadastrar
        </PrimaryButton>
      </div>
    </InitialTemplate>
  );
}
