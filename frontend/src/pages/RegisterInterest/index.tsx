import { ChangeEventHandler, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IcLogo } from '../../assets';
import { Input, PrimaryButton } from '../../components/atoms';
import { DashboardTemplate } from '../../components/organisms';
import { CreateInterest } from '../../services/interests';
import useUser from '../../stores/user';
import { FirstStep, SecondStep } from './components';
import styles from './styles.module.scss';

export const RegisterInterests = () => {
  const [place, setPlace] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [type, setType] = useState<string>('casa');
  const [furnished, setFurnished] = useState<boolean>(false);
  const [allowPets, setAllowPets] = useState<boolean>(false);
  const [pool, setPool] = useState<boolean>(false);
  const [morningSun, setMorningSun] = useState<boolean>(false);
  const [hasGuarantor, setHasGuarantor] = useState<boolean>(false);
  const [showSecondStep, setShowSecondStep] = useState<boolean>(false);
  const [src, setSrc] = useState<string>();
  const [file, setFile] = useState<File>();
  const { user, isOwner } = useUser();
  const history = useNavigate();
  const [cookies] = useCookies(['token']);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (event) {
        setFile(file);
        setSrc(event.target ? (event.target.result as string) : '');
      };
      // reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const interest = {
      place,
      size,
      value: price,
      type,
      furnished,
      pets: allowPets,
      pool,
      morning_sun: morningSun,
      guarantor: hasGuarantor,
      client_id: user?.id,
    };

    const resp = await CreateInterest({
      data: file ? { ...interest, file } : interest,
      token: cookies.token,
    });
    if (!resp.error) {
      toast.success('Interesse cadastrado com sucesso.');
      history('/');
    } else {
      toast.error('Algo deu errado ): tente novamente.');
    }
    setFile(undefined);
    // submit
  };

  const enableButton = !!(place && size && price && type);
  return (
    <DashboardTemplate>
      <div className={styles.container}>
        <p className={styles.title}>
          {isOwner ? 'Cadastrar Novo Imóvel' : 'Cadastrar Novo Interesse'}
        </p>
        {!showSecondStep ? (
          <FirstStep
            src={src}
            onChangeFile={handleChange}
            place={place}
            setPlace={setPlace}
            size={size}
            setSize={setSize}
            price={price}
            setPrice={setPrice}
            type={type}
            setType={setType}
            enableButton={enableButton}
            onClick={() => setShowSecondStep(true)}
          />
        ) : (
          <SecondStep
            furnished={furnished}
            setFurnished={setFurnished}
            allowPets={allowPets}
            setAllowPets={setAllowPets}
            pool={pool}
            setPool={setPool}
            hasGuarantor={hasGuarantor}
            setHasGuarantor={setHasGuarantor}
            morningSun={morningSun}
            setMorningSun={setMorningSun}
            onClick={handleSubmit}
            setShowSecondStep={setShowSecondStep}
          />
        )}
      </div>
    </DashboardTemplate>
  );
};
