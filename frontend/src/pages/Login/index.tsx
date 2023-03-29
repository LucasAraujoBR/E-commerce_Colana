import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input, PrimaryButton } from '../../components/atoms';
import { InitialTemplate } from '../../components/organisms/loginTemplate';
import { FetchCities, SignIn } from '../../services';
import useUser from '../../stores/user';
import { User } from '../../types';
import styles from './styles.module.scss';

export function Login() {
  const [cookies, setCookie] = useCookies(['token', 'user']);
  const { addUser, addIsOwner } = useUser();
  const history = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    const data = await SignIn({ email, password });
    if (data?.access) {
      addUser(data?.user);
      addIsOwner(data?.user?.type === 'proprietário');
      setCookie('token', data?.access, { path: '/' });
      setCookie('user', data?.user, { path: '/' });
      history('/dashboard');
    } else {
      toast.error('Email ou senha inválidos.');
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   FetchCities().then((resp) => {
  //     console.log(resp);
  //   });
  // }, []);

  return (
    <InitialTemplate
      hasBackButton
      onClickBackButton={() => history('/initial')}
    >
      <div className={styles.container}>
        <p className={styles.title}>Entrar</p>
        <div className={styles.form}>
          <Input
            placeholder='E-mail'
            type='email'
            value={email}
            onChange={setEmail}
            name='email'
          />
          <Input
            placeholder='Senha'
            type='password'
            value={password}
            onChange={setPassword}
            name='senha'
          />
        </div>
        <PrimaryButton isLoading={isLoading} onClick={handleSubmit}>
          Entrar
        </PrimaryButton>
      </div>
    </InitialTemplate>
  );
}
