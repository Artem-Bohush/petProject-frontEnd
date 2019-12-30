import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../img/png/logo.png';
import AuthenticationService from '../services/AuthenticationService';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
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
            <div className="success-signup" style={this.props.showSuccess}>
              Регистрация прошла успешно! Теперь Вы можете войти в
              систему со своими данными
                        </div>
            <form className="login-content-form" id="login-form"
              onSubmit={(e) => this.logIn(e)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-input" id="email" name="email"
                  placeholder="Введите ваш email" onChange={(e) => this.handleChange(e)}></input>
                <div className="status">Неправильный email</div>
                <div className="email-require">Заполните поле</div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" className="form-input" id="password" name="password"
                  placeholder="Пароль" onChange={(e) => this.handleChange(e)}></input>
                <div className="status">Неправильный пароль</div>
                <div className="password-require">Заполните поле</div>
              </div>

              <button className="form-button" type="submit">Войти</button>
              <p className="form-text">Нет аккаунта?
                                <Link className="link" to="/signup"> Зарегистрироваться!</Link></p>
              <div className="success-login">Авторизация успешна!</div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  //-----------------нижче попередні функції-------------------------------

  checkEmail() {
    document.getElementsByClassName('email-require')[0].style.display = 'none'
    document.getElementsByClassName('status')[0].style.display = 'none'
  }

  checkPassword() {
    document.getElementsByClassName('password-require')[0].style.display = 'none'
    document.getElementsByClassName('status')[1].style.display = 'none'
  }

  logIn(e) {
    e.preventDefault();
    AuthenticationService
      .executeBasicAuthentication(this.state.email, this.state.password)
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(this.state.email, this.state.password);
        document.querySelector('.success-login').style.show = 'block'
        setTimeout(() => {
          this.props.history.push(`/`)
        }, 1500);
      }).catch(() => {
        console.log('wrongData');
        // this.setState({ showSuccessMessage: false });
        // this.setState({ hasLoginFailed: true });
      })






    // let form = document.querySelector('.login-content-form'),
    //     inputs = form.getElementsByClassName('form-input'),
    //     status = document.getElementsByClassName('status'),
    //     success = document.getElementsByClassName('success-login')[0],
    //     emailRequire = document.getElementsByClassName('email-require')[0],
    //     passwordRequire = document.getElementsByClassName('password-require')[0];

    // emailRequire.style.display = 'none'
    // passwordRequire.style.display = 'none'
    // for (const el of inputs) {
    //     el.classList.remove('wrong-input')
    // }

    // if (inputs[0].value !== '' && inputs[1].value !== '') {
    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'login');
    //     request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
    //     let formData = new FormData(form);
    //     let obj = {};
    //     formData.forEach(function (value, key) {
    //         obj[key] = value;
    //     })
    //     let json = JSON.stringify(obj);
    //     request.send(json);
    //     request.addEventListener('readystatechange', () => {
    //         if (request.readyState === 4 && request.status === 200) {
    //             let data = JSON.parse(request.response);
    //             if (data.description === 'wrong email') { 
    //                 status[0].style.display = 'block'
    //                 inputs[0].classList.add('wrong-input');
    //                 inputs[0].value = '';
    //             } else if (data.description === 'wrong password') {
    //                 status[0].style.display = 'none'
    //                 inputs[0].classList.remove('wrong-input');
    //                 inputs[0].classList.add('right-input');
    //                 status[1].style.display = 'block'
    //                 inputs[1].classList.add('wrong-input');
    //                 inputs[1].value = '';
    //             } else {
    //                 for (const el of inputs) {
    //                     el.classList.remove('wrong-input')
    //                     el.classList.remove('right-input')
    //                 }
    //                 for (const el of status) {
    //                     el.style.display = 'none'
    //                 }
    //                 success.style.display = 'block';
    //                 setTimeout(() => {
    //                     this.props.toggleToTemplateCallBack(data.email, data.name, data.currentBalance);
    //                 }, 1500);
    //             }
    //         }
    //     })
    // } else {
    //     if (inputs[0].value === '') {
    //         for (const el of status) {
    //             el.style.display = 'none'
    //         }
    //         emailRequire.style.display = 'block'
    //         inputs[0].classList.add('wrong-input');
    //     } else {
    //         for (const el of status) {
    //             el.style.display = 'none'
    //         }
    //         emailRequire.style.display = 'none'
    //         inputs[0].classList.remove('wrong-input');
    //         passwordRequire.style.display = 'block'
    //         inputs[1].classList.add('wrong-input');
    //     }
    // }
  }

  // showSignUp() {
  //     const contentCopy = this.state.content.concat()
  //     contentCopy.forEach(element => {
  //         if (element.show) {
  //             element.show = false
  //             return
  //         }
  //     })
  //     contentCopy.find(c => c.name === 'SignUp').show = true
  //     this.setState({content: contentCopy})
  // }
}

export default withRouter(Login)