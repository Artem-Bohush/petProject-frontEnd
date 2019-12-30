import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import LogSignService from '../services/LogSignService';
import logo from '../img/png/logo.png';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                <input type="text" className="form-input" id="email" name="email"
                  placeholder="Введите email"
                  onInput={(e) => this.checkEmail(e.target)}></input>
                <div className="email-exists">Email уже зарегистрирован</div>
                <div className="email-require">Заполните поле</div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" className="form-input" id="password"
                  name="password" placeholder="Введите пароль"
                  onInput={(e) => this.checkPassword(e.target)}></input>
                <div className="password-require">Заполните поле</div>
                <div className="password-length">Минимум 6 знаков</div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input type="text" className="form-input" id="name" name="name"
                  placeholder="Введите имя" onInput={() => this.checkName()}></input>
                <div className="name-require">Заполните поле</div>
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
                                <Link className="link" to="/login"> Войти!</Link></p>
              <div className="success-login">Регистрация успешна!</div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  signUp(e) {
    e.preventDefault();
    let form = document.querySelector('.login-content-form'),
      success = document.querySelector('.success-login'),
      formData = new FormData(form),
      obj = {};

    formData.forEach(function (value, key) {
      obj[key] = value;
    });

    LogSignService.signUp(obj).then(() => {
      success.style.display = 'block';
      setTimeout(() => {
        this.props.history.push(`/login`)
      }, 1500);
    }).catch(() => {
      console.log('smth went wrong(');
    })
  }

  checkEmail(el) {
    // document.getElementsByClassName('email-require')[0].style.display = 'none'
    let emailExists = document.querySelector('.email-exists'),
      obj = { email: el.value };
    LogSignService.checkEmail(obj).then(() => {
      emailExists.style.display = 'block'
    }).catch(() => {
      emailExists.style.display = 'none'
    })
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

  checkName() {
    document.getElementsByClassName('name-require')[0].style.display = 'none'
  }

  checkPassword(e) {
    let lengthWarn = document.getElementsByClassName('password-length')[0];
    document.getElementsByClassName('password-require')[0].style.display = 'none'
    if (e.value.length < 6) {
      lengthWarn.style.display = 'block'
      e.style.borderBottom = '1px solid #DA000B'
    } else {
      lengthWarn.style.display = 'none'
      e.classList.remove('wrong-input')
      e.style.borderBottom = '1px solid #61B85C'
    }
  }

  onFocus(e) {
    e.style.backgroundColor = "#31A7C1"
  }

  outFocus(e) {
    e.style.backgroundColor = "#52bcd3"
  }

  //-----------------нижче попередні функції-------------------------------

  // checkEmail(e) {
  //     let request = new XMLHttpRequest(),
  //         emailExists = document.querySelector('.email-exists');

  //     document.getElementsByClassName('email-require')[0].style.display = 'none'

  //     request.open('POST', 'checkEmail');
  //     request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
  //     let obj = {
  //         email: e.value
  //     };
  //     let json = JSON.stringify(obj);
  //     request.send(json);
  //     request.addEventListener('readystatechange', () => {
  //         if (request.readyState === 4 && request.status === 200) {
  //             let data = JSON.parse(request.response);
  //             if (data.description === 'wrong email') {
  //                 emailExists.style.display = 'block'
  //                 e.style.borderBottom = '1px solid #DA000B'
  //             } else {
  //                 emailExists.style.display = 'none'
  //                 e.style.borderBottom = '1px solid #d7dde4'
  //             }
  //         }
  //     })
  // }

  goToLogin(e) {
    e.preventDefault();

    let form = document.querySelector('.login-content-form'),
      inputs = form.getElementsByClassName('form-input'),
      emailExists = document.getElementsByClassName('email-exists')[0],
      success = document.getElementsByClassName('success-login')[0],
      emailRequire = document.getElementsByClassName('email-require')[0],
      passwordRequire = document.getElementsByClassName('password-require')[0],
      nameRequire = document.getElementsByClassName('name-require')[0];

    emailRequire.style.display = 'none'
    passwordRequire.style.display = 'none'
    nameRequire.style.display = 'none'

    for (const el of inputs) {
      el.classList.remove('wrong-input')
      el.classList.remove('right-input')
    }

    if (inputs[0].value === '' || inputs[1].value === '' || inputs[2].value === '') {
      for (const el of inputs) {
        el.classList.remove('wrong-input')
        el.classList.remove('right-input')
      }
      if (inputs[0].value === '') {
        emailRequire.style.display = 'block'
        inputs[0].classList.add('wrong-input')
      } else if (inputs[1].value === '') {
        passwordRequire.style.display = 'block'
        inputs[1].classList.add('wrong-input')
      } else {
        nameRequire.style.display = 'block'
        inputs[2].classList.add('wrong-input')
      }
    } else {
      if (emailExists.style.display === 'none') {
        let request = new XMLHttpRequest();
        request.open('POST', 'signup');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        })
        let json = JSON.stringify(obj);
        request.send(json);
        request.addEventListener('readystatechange', () => {
          if (request.readyState === 4 && request.status === 200) {
            success.style.display = 'block';
            setTimeout(() => {
              this.props.toggleSucceessSignupCallBack();
            }, 1500);
          }
        });
      }
    }
  }
}

export default withRouter(SignUp)