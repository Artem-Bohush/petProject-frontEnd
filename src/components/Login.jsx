import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../img/png/logo.png';
import LoginSignupService from '../services/LoginSignupService';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessSignup: false,
      showSuccessLogin: false,
      showFailedLogin: false,
      requireEmail: false,
      requirePassword: false
    };
  }

  render() {
    return (
      <div className="login-bg">
        <div className="login-panel">
          <header className="login-header">
            <div className="login-header-logo">
              <img src={logo} alt="logo" />
            </div>
            <h1 className="login-header-title">Money Keeper</h1>
          </header>
          <div className="login-content">
            <p className="login-content-title">Войдите для работы</p>
            {this.state.showSuccessSignup && <div className="success-signup">
              Регистрация прошла успешно! Теперь Вы можете войти в
              систему со своими данными</div>}
            {this.state.showFailedLogin && <div className="failed-login">
              Вы ввели неправильный email или пароль</div>}
            <form className="login-content-form" id="login-form" onSubmit={(e) => this.logIn(e)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-input" id="email" name="email"
                  placeholder="Введите ваш email" onChange={() => this.emailTyping()} ></input>
                {this.state.requireEmail && <div className="email-require">Введите email</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" className="form-input" id="password" name="password"
                  placeholder="Пароль" onChange={(e) => this.passwordTyping(e)}></input>
                {this.state.requirePassword && <div className="password-require">Введите пароль</div>}
              </div>
              <button className="form-button" type="submit">Войти</button>
              <p className="form-text">Нет аккаунта?
                <Link className="link" to="/signup"> Зарегистрироваться!</Link></p>
            </form>
            {this.state.showSuccessLogin && <div className="success-login">Авторизация успешна!</div>}
          </div>
        </div>
      </div>
    )
  }

  emailTyping() {
    this.setState({ requireEmail: false });
    document.getElementsByClassName('form-input')[0].classList.remove('wrong-input');
  }

  passwordTyping() {
    this.setState({ requirePassword: false });
    document.getElementsByClassName('form-input')[1].classList.remove('wrong-input');
  }

  logIn(e) {
    e.preventDefault();
    let form = document.querySelector('#login-form'),
      inputs = Array.from(form.getElementsByClassName('form-input'));

    if (inputs[0].value !== '' && inputs[1].value !== '') {
      LoginSignupService
        .executeJwtAuthenticationService(inputs[0].value, inputs[1].value)
        .then(result => {
          if (result.token) {
            LoginSignupService.registerSuccessfulLoginForJwt(result.token);
            inputs[0].classList.add('right-input');
            inputs[1].classList.add('right-input');
            this.setState({ showSuccessLogin: true, showFailedLogin: false });
            setTimeout(() => {
              this.props.history.push('/');
            }, 1500);
          } else {
            inputs[0].classList.add('wrong-input');
            inputs[1].classList.add('wrong-input');
            this.setState({ showFailedLogin: true, showSuccessSignup: false });
          }
        })
        .catch(error => console.error(error));
    } else {
      inputs.forEach((input, index) => {
        if (input.value === '') {
          input.classList.add('wrong-input');
          if (index === 0) {
            this.setState({ requireEmail: true });
          } else if (index === 1) {
            this.setState({ requirePassword: true });
          }
        }
      });
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('successSignup')) {
      this.setState({ showSuccessSignup: true });
    }
  }

  componentWillUpdate() {
    sessionStorage.removeItem('successSignup');
  }
}

export default withRouter(Login)