import React from 'react';
import SettingsService from '../services/SettingsService';
import LoginSignupService from '../services/LoginSignupService';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEmail: '',
      currentUsername: '',
      successChangeEmail: false,
      successChangeName: false,
      successChangePass: false,
      wrongEmail: false,
      wrongPassword: false,
      wrongNewPassword: false,
      passMatches: false
    };
  }

  render() {
    return (
      <>
        {this.props.isOpen &&
          <>
            <div className="settings-title-block">
              <div onClick={() => this.goBack()}>
                <span className="icon-arrow-left-solid"></span>
              </div>
              <h3 className="title">Учетная запись</h3>
            </div>
            <div className="settings-content-block">
              <div className="row">
                <div className="col">
                  <div className="settings-card">
                    <form onSubmit={e => this.changeEmail(e)}>
                      <div className="new-email">
                        <div className="form-group">
                          <label className="control-label" htmlFor="newEmail">Ваш текущий email:
                            <span>{this.state.currentEmail}</span></label>
                          <input className="form-control" type="email" id="newEmail"
                            placeholder="введите новый email" onInput={e => this.checkEmail(e)}
                            onChange={() => this.emailTyping()}></input>
                          {this.state.wrongEmail && <div className="email-require">Этот email уже зарегистрирован</div>}
                          {this.state.successChangeEmail && <div className="success-email-change">Email успешно изменен</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Изменить email</button>
                      </div>
                    </form>
                    <form onSubmit={e => this.changePassword(e)}>
                      <div className="new-password">
                        <div className="form-group">
                          <label className="control-label" htmlFor="currentPassword">Пароль:</label>
                          <input className="form-control" type="password" id="currentPassword" placeholder="введите текущий пароль"
                            onInput={e => this.checkCurrentPassword(e)}></input>
                          {this.state.wrongPassword && <div className="password-wrong">Неверный пароль</div>}
                          <input className="form-control" type="password" placeholder="введите новый пароль"
                            onInput={e => this.checkNewPassword(e)} id="newPassword"></input>
                          {this.state.wrongNewPassword && <div className="password-length">Минимум 6 знаков</div>}
                          <input className="form-control" type="password" placeholder="повторите новый пароль"
                            onInput={e => this.repeatNewPassword(e)} id="repeatNewPassword"></input>
                        </div>
                        {this.state.successChangePass && <div className="success-email-change">Пароль успешно изменено</div>}
                        <button type="submit" className="btn btn-primary">Изменить пароль</button>
                      </div>
                    </form>
                    <form onSubmit={e => this.changeName(e)}>
                      <div className="new-name">
                        <div className="form-group">
                          <label className="control-label" htmlFor="newName">Ваше текущее имя:
                            <span>{this.state.currentUsername}</span></label>
                          <input className="form-control" type="text" id="newName" placeholder="введите новое имя"
                            onChange={() => this.nameTyping()}></input>
                          {this.state.successChangeName && <div className="success-email-change">Имя успешно изменено</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Изменить имя</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }

  checkEmail(e) {
    LoginSignupService.executeCheckingEmail(e.target.value)
      .then(result => {
        if (result.emailExists) {
          document.getElementById('newEmail').classList.add('wrong-input');
          this.setState({ wrongEmail: true, successChangeEmail: false });
        }
      })
      .catch(error => console.error(error));
  }

  changeEmail(e) {
    e.preventDefault();
    let emailInput = document.querySelector('#newEmail');
    if (emailInput.value !== '' && !this.state.wrongEmail) {
      SettingsService.setNewEmail(emailInput.value)
        .then(result => {
          emailInput.value = '';
          LoginSignupService.registerSuccessfulLoginForJwt(result.token);
          this.setState({ successChangeEmail: true });
          this.getCurrentUserData();
        })
        .catch(error => console.error(error));
    }
  }

  emailTyping() {
    this.setState({ wrongEmail: false, successChangeEmail: false });
    document.getElementById('newEmail').classList.remove('wrong-input');
  }

  checkCurrentPassword(e) {
    const currentPassInp = e.target;
    SettingsService.checkPassword(currentPassInp.value)
      .then(result => {
        if (!result.isEqual) {
          currentPassInp.classList.add('wrong-input');
          this.setState({ wrongPassword: true });
        } else {
          currentPassInp.classList.remove('wrong-input');
          this.setState({ wrongPassword: false });
        }
      })
      .catch(error => console.error(error));
  }

  checkNewPassword(e) {
    const newPassInp = document.getElementById('newPassword');
    if (newPassInp.value.length < 6) {
      this.setState({ wrongNewPassword: true });
      newPassInp.classList.add('wrong-input');
    } else {
      this.setState({ wrongNewPassword: false });
      newPassInp.classList.remove('wrong-input');
    }
  }

  repeatNewPassword(e) {
    const repeatNewPassInp = e.target;
    const newPassInp = document.getElementById('newPassword');
    if (repeatNewPassInp.value !== newPassInp.value) {
      this.setState({ passMatches: false });
      repeatNewPassInp.style.border = '1px solid #DA000B';
    } else {
      this.setState({ passMatches: true });
      repeatNewPassInp.style.border = '1px solid #61B85C';
    }
  }

  changePassword(e) {
    e.preventDefault();
    if (!this.state.wrongPassword && !this.state.wrongNewPassword && this.state.passMatches) {
      const newPassword = document.querySelector('#newPassword').value;
      SettingsService.setNewPassword(newPassword)
        .then(() => {
          const inputs = Array.from(document.getElementsByClassName('form-control'));
          for (let inp of inputs) {
            inp.value = '';
            inp.style.border = '1px solid #CED4DA';
          }
          this.setState({ passMatches: false, successChangePass: true });
        })
        .catch(error => console.error(error));
    }
  }

  changeName(e) {
    e.preventDefault();
    let newNameInput = document.querySelector('#newName');
    if (newNameInput.value !== '') {
      SettingsService.setNewUsername(newNameInput.value)
        .then(() => {
          newNameInput.value = '';
          this.setState({ successChangeName: true });
          this.getCurrentUserData();
        })
        .catch(error => console.error(error));
    }
  }

  nameTyping() {
    this.setState({ successChangeName: false });
  }

  goBack() {
    this.setState({
      successChangeEmail: false, successChangeName: false, successChangePass: false,
      wrongPassword: false, wrongEmail: false, wrongNewPassword: false, passMatches: false
    });
    this.props.goBack();
  }

  getCurrentUserData() {
    SettingsService.getCurrentUserData()
      .then(result => {
        this.setState({ currentEmail: result.email, currentUsername: result.username });
      })
  }

  componentDidMount() {
    this.getCurrentUserData();
  }
}

export default Settings;