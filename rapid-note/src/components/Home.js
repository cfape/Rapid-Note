
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import logotext from '../img/logotext.png';

export function Home(prop) {


  const navigate = useNavigate();
  const btnLogin = () => {
    navigate("/login", { replace: true });
    }

  return (
    <div className='Container-home'>
      <div className='Content-home'>
        <img src={logotext} className='App-logotext' alt="text" />
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='Title-home'>Escribe tus notas, sin temor a perderlas</h1>
      </div>
      <div className='Content-btn'>
        <button onClick={btnLogin} data-testid="btnLogin" className='Btn-home'>Iniciar Sesión</button>
      </div>
      <div className='Content-link'>
        <p className='styleLine' >¿No tienes cuenta?</p>
        <Link to='/register' className='Link-home'> Regístrate</Link>
      </div>
      </div>
  );
}
