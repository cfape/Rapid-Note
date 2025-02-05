import { useState } from "react";
import { login, loginWithGoogle } from "../contex/authContext.js";
import { Link, useNavigate } from "react-router-dom";
import logotext from "../img/logotext.png";
import btnGoogle from "../img/btnGoogle.png";

export function Login(props) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    props.setUser({ ...props.user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const objectUser = await login(props.user.email, props.user.password);
      localStorage.setItem('email', objectUser.user.email);
      navigate('/rapidnote');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Correo inválido');
      } else if (error.code === 'auth/user-not-found') {
        setError('El correo no está registrado');
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const objectUser = await loginWithGoogle();
      props.setUser({ email: objectUser.user.email });
      localStorage.setItem('email', objectUser.user.email);
      navigate('/rapidnote');
    } catch (error) {
      if (error) {
      }
      if (error.code === 'auth/invalid-email') {
        setError('auth/correo inválido');
      } else if (error.code === 'auth/user-not-found') {
        setError('El correo no está registrado');
      }
    }
  };

  return (
    <section className="Content-register">
      <img src={logotext} className="Logotext-login" alt="text" />

      <form onSubmit={handleSubmit} className="Form-login">
        <label htmlFor="text">Email </label>
        <input
          autoComplete="username"
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          onChange={handleChange}
          data-testid="login-email-input"
        />

        <label htmlFor="password">Password </label>
        <input
          autoComplete="current-password"
          type="password"
          name="password"
          placeholder="******"
          onChange={handleChange}
          data-testid="login-password-input"
        />

        <div className="Content-btn-login">
          <button className="BtnLogin">Inicia Sesión</button>
        </div>
      </form>
      <div className="Content-btn-google">
        <button
          className="BtnGoogle"
          data-testid="btnGoogle"
          onClick={handleGoogleSignin}
        >
          <img src={btnGoogle} className="LogoGoogle" alt="logo" />
        </button>
      </div>

      <div className="Content-link-login">
        <Link to="/LIM017-notes/" className="App-link">
          Volver al inicio
        </Link>
      </div>

      <div className="Content-error-login">{error && <p>{error}</p>}</div>
    </section>
  );
}
