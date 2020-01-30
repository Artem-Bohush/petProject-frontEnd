import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../img/png/logo.png';
import LoginSignupService from '../services/LoginSignupService';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessSignup: false,
      requireEmail: false,
      requirePassword: false,
      requireName: false,
      wrongPassword: false,
      wrongEmail: false
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
            <p className="login-content-title">Регистрация для получения доступа</p>
            <form className="login-content-form" onSubmit={(e) => this.signUp(e)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-input" id="email" name="email"
                  placeholder="Введите email"
                  onInput={(e) => this.checkEmail(e)} onChange={() => this.emailTyping()}></input>
                {this.state.requireEmail && <div className="email-require">Введите email</div>}
                {this.state.wrongEmail && <div className="email-require">Этот email уже зарегистрирован</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" className="form-input" id="password"
                  name="password" placeholder="Введите пароль"
                  onInput={(e) => this.checkPassword(e)} onChange={() => this.passwordTyping()}></input>
                {this.state.requirePassword && <div className="password-require">Введите пароль</div>}
                {this.state.wrongPassword && <div className="password-length">Минимум 6 знаков</div>}
              </div>
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input type="text" className="form-input" id="name" name="username"
                  placeholder="Введите имя" onChange={() => this.nameTyping()}></input>
                {this.state.requireName && <div className="name-require">Введите имя</div>}
              </div>
              <div className="form-group">
                <div className="checkbox">
                  <input onClick={() => this.agree()} className="checkbox-input" type="checkbox" id="agree" />
                  <label htmlFor="agree" className="checkbox-label">Согласен с правилами</label>
                </div>
              </div>
              <button className="btn-regist" disabled type="submit"
                onMouseOver={(e) => this.onFocus(e.target)}
                onMouseOut={(e) => this.outFocus(e.target)}>Зарегистрироваться</button>
              <p className="form-text">Уже есть аккаунт?
                <Link className="link" to="/login"> Войти!</Link>
              </p>
              {this.state.showSuccessSignup && <div className="success-login">Регистрация успешна!</div>}
            </form>
          </div>
        </div>
      </div>
    )
  }

  signUp(e) {
    e.preventDefault();
    const form = document.querySelector('.login-content-form'),
      formData = new FormData(form),
      newUser = {};

    formData.forEach(function (value, key) {
      newUser[key] = value;
    });

    if (newUser.email && newUser.password && newUser.username && !this.state.wrongEmail && !this.state.wrongPassword) {
      LoginSignupService.executeSignup(newUser)
        .then(() => {
          sessionStorage.setItem('successSignup', true);
          this.setState({ showSuccessSignup: true });
          setTimeout(() => {
            this.props.history.push('/login')
          }, 1500);
        })
        .catch(error => console.error(error));
    } else {
      const inputs = Array.from(form.getElementsByClassName('form-input'));
      inputs.forEach((input, index) => {
        if (input.value === '') {
          input.classList.add('wrong-input');
          if (index === 0) {
            this.setState({ requireEmail: true });
          } else if (index === 1) {
            this.setState({ requirePassword: true });
          } else {
            this.setState({ requireName: true });
          }
        }
      });
    }
  }

  checkEmail(e) {
    LoginSignupService.executeCheckingEmail(e.target.value)
      .then(result => {
        if (result.emailExists) {
          document.getElementById('email').classList.add('wrong-input');
          this.setState({ wrongEmail: true });
        }
      })
      .catch(error => console.error(error));
  }

  checkPassword(e) {
    if (e.target.value.length < 6) {
      e.target.style.borderBottom = '1px solid #DA000B';
      this.setState({ wrongPassword: true });
    } else {
      e.target.style.borderBottom = '1px solid #61B85C';
      this.setState({ wrongPassword: false });
    }
  }

  agree() {
    const btn = document.getElementsByClassName('btn-regist')[0]
    btn.disabled = !btn.disabled
    if (!btn.disabled) {
      btn.style.backgroundColor = '#52bcd3'
      btn.style.cursor = 'pointer'
    } else {
      btn.style.backgroundColor = '#A8DDE9'
      btn.style.cursor = 'default'
    }
  }

  emailTyping() {
    this.setState({ requireEmail: false, wrongEmail: false });
    document.getElementsByClassName('form-input')[0].classList.remove('wrong-input');
  }

  passwordTyping() {
    this.setState({ requirePassword: false });
    document.getElementsByClassName('form-input')[1].classList.remove('wrong-input');
  }

  nameTyping() {
    this.setState({ requireName: false });
    document.getElementsByClassName('form-input')[2].classList.remove('wrong-input');
  }

  onFocus(e) {
    e.style.backgroundColor = "#31A7C1"
  }

  outFocus(e) {
    e.style.backgroundColor = "#52bcd3"
  }
}

export default withRouter(SignUp)