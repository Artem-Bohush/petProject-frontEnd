import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousPageName: this.props.previousPageName
    };
  }

  render() {
    return (
      <>
        <div className="settings-title-block">
          <div onClick={() => this.props.goBackCallBack(this.state.previousPageName)}>
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
                                                <span> {this.props.email}</span></label>
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
                                                <span> Артём</span></label>
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
    )
  }

  changeEmail(e) {
    e.preventDefault();
    let newEmail = document.querySelector('#newEmail');
    if (newEmail.value !== '') {
      let request = new XMLHttpRequest();
      request.open('POST', 'changeEmail');
      request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
      let obj = {
        email: this.props.email,
        newEmail: newEmail.value
      };
      let json = JSON.stringify(obj);
      request.send(json);
      request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
          newEmail.value = '';
          document.querySelector('.success-email-change').style.display = 'block'
        }
      })
    }
  }

  checkCurrentPassword(e) {
    let request = new XMLHttpRequest();
    request.open('POST', 'checkPassword');
    request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
    let obj = {
      email: this.props.email,
      currentPassword: e.value
    };
    let json = JSON.stringify(obj);
    request.send(json);
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        e.style.border = '1px solid #61B85C'
      }
    })
  }

  changePassword(e) {
    e.preventDefault();
    let permit = this.helperFunction();
    if (permit) {
      let request = new XMLHttpRequest(),
        newPassword = document.querySelector('#newPassword');
      request.open('POST', 'changePassword');
      request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
      let obj = {
        email: this.props.email,
        newPassword: newPassword.value
      };
      let json = JSON.stringify(obj);
      request.send(json);
      request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
          //как-то показать на фронтенде
        }
      })
    }
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

  changeName(e) {
    e.preventDefault();
    let newName = document.querySelector('#newName');
    if (newName.value !== '') {
      let request = new XMLHttpRequest();
      request.open('POST', 'changeName');
      request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
      let obj = {
        email: this.props.email,
        newName: newName.value
      };
      let json = JSON.stringify(obj);
      request.send(json);
      request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
          //как-то показать на фронтенде
        }
      })
    }
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
}

export default Settings;