import React from 'react';
import SettingsService from '../services/SettingsService';
import AuthenticationService from '../services/AuthenticationService';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEmail: '',
      currentUsername: ''
    };
  }

  render() {
    return (
      <>
        {this.props.isOpen &&
          <>
            <div className="settings-title-block">
              <div onClick={() => this.props.goBack()}>
                <span className="icon-arrow-left-solid"></span>
              </div>
              <h3 className="title">Учетная запись</h3>
            </div>
            <div className="settings-content-block">
              <div className="row">
                <div className="col">
                  <div className="settings-card">
                    <form onSubmit={(e) => this.changeEmail(e)}>
                      <div className="new-email">
                        <div className="form-group">
                          <label className="control-label" htmlFor="newEmail">Ваш текущий email:
                            <span>{this.state.currentEmail}</span></label>
                          <input className="form-control" type="text" id="newEmail" placeholder="введите новый email"></input>
                          <div className="success-email-change">Email успешно изменен</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Изменить email</button>
                      </div>
                    </form>
                    <form onSubmit={(e) => this.changePassword(e)}>
                      <div className="new-password">
                        <div className="form-group">
                          <label className="control-label" htmlFor="currentPassword">Пароль:</label>
                          <input className="form-control" type="password" id="currentPassword" placeholder="введите текущий пароль"
                            onInput={(e) => this.checkCurrentPassword(e.target)}></input>
                          <input className="form-control" type="password" placeholder="введите новый пароль"
                            onInput={(e) => this.checkNewPassword(e.target)} id="newPassword"></input>
                          <div className="password-length">Минимум 6 знаков</div>
                          <input className="form-control" type="password" placeholder="повторите новый пароль"
                            onInput={(e) => this.repeatNewPassword(e.target)}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Изменить пароль</button>
                      </div>
                    </form>
                    <form onSubmit={(e) => this.changeName(e)}>
                      <div className="new-name">
                        <div className="form-group">
                          <label className="control-label" htmlFor="newName">Ваше текущее имя:
                            <span>{this.state.currentUsername}</span></label>
                          <input className="form-control" type="text" id="newName" placeholder="введите новое имя"></input>
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

  changeEmail(e) {
    e.preventDefault();
    let newEmail = document.querySelector('#newEmail').value;
    if (newEmail !== '') {
      SettingsService.setNewEmail(newEmail)
        .then(result => {
          AuthenticationService.registerSuccessfulLoginForJwt(result.token);
          this.getCurrentUserData();
        })
        .catch(error => console.error(error));
    }
  }

  changePassword(e) {
    e.preventDefault();
    const newPassword = document.querySelector('#newPassword').value;
    SettingsService.setNewPassword(newPassword)
      .then(() => {
        const inputs = Array.from(document.getElementsByClassName('form-control'));
        for (let inp of inputs) {
          inp.value = '';
        }
      })
      .catch(error => console.error(error));
    // let currentPassword = document.querySelector('#newEmail'),
    //   newPassword = document.querySelector('#newEmail'),
    //   repeatPassword = document.querySelector('#newEmail');

    // if (permit) {
    //   SettingsService.setNewPassword()
    // }
  }

  helperFunction() {
    let currentPassword = document.querySelector('#newEmail'),
      newPassword = document.querySelector('#newEmail'),
      repeatPassword = document.querySelector('#newEmail');

    if (currentPassword.style.border === '1px solid #61B85C' &&
      newPassword.style.border === '1px solid #61B85C' &&
      repeatPassword.style.border === '1px solid #61B85C') {
      return true
    } else {
      return false
    }
  }

  checkCurrentPassword(input) {
    SettingsService.checkPassword(input.value)
      .then(result => {
        console.log(result.isEqual);
      })
      .catch(error => console.error(error));
  }

  checkNewPassword(e) {
    let lengthWarn = document.querySelector('.password-length');
    if (e.value.length < 6) {
      lengthWarn.style.display = 'block'
      e.style.marginBottom = '0px'
      e.style.border = '1px solid #DA000B'
    } else {
      lengthWarn.style.display = 'none'
      e.style.marginBottom = '10px'
      e.style.border = '1px solid #61B85C'
    }
  }

  repeatNewPassword(e) {
    let newPassword = document.querySelector('#newPassword');
    if (e.value !== newPassword.value) {
      e.style.border = '1px solid #DA000B'
    } else {
      e.style.border = '1px solid #61B85C'
    }
  }

  changeName(e) {
    e.preventDefault();
    let newName = document.querySelector('#newName').value;
    if (newName.value !== '') {
      SettingsService.setNewUsername(newName)
        .then(() => {
          document.querySelector('#newName').value = '';
          this.getCurrentUserData();
        })
        .catch(error => console.error(error));
    }
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