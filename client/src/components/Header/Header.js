import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { MenuItem } from './MenuItem/MenuItem'
 
import './Header.css'

@inject('app', 'user') @observer
export default class Header extends Component {
  constructor(props) {
    super(props)

    this.loggedPrimaryList = [
      {
        type: 'menuItem',
        title: 'My Groups',
        url: this.props.app.routes.myGroups
      },
      {
        type: 'menuItem',
        title: 'My Schedule',
        url: this.props.app.routes.mySchedule
      }
    ]

    this.unLoggedPrimaryList = [
      {
        type: 'menuItem',
        purpose: 'projectName',
        title: this.props.app.projectName
      }
    ]

    this.loggedSideList = [
      {
        type: 'menuItem',
        title: 'How to use?',
        url: this.props.app.routes.howToUse
      },
      {
        type: 'menuItem',
        title: 'Support',
        url: this.props.app.routes.support
      },
      {
        type: 'btn',
        title: 'Log out',
        cb: this.handleLogOutBtn.bind(this)
      }
    ]

    this.unLoggedSideList = [
      {
        type: 'btn',
        title: 'Log In',
        cb: this.handleLogInBtn.bind(this)
      }
    ]
  }

  render() {
    return (
        <div className="app__header">
          <div className="app__header__menu">
            <div className="app__header__menu__primary">
              <ul className="app__header__menu__primary__list">
                {
                  this.props.user.data.email
                    ? this.loggedPrimaryList
                      .map((item, i) => 
                        <MenuItem 
                          title={item.title}
                          type={item.type}
                          key={i}
                          classPref="app__header__menu__primary__list"
                          url={item.url}
                        />)
                    : this.unLoggedPrimaryList
                      .map((item, i) =>
                        <MenuItem 
                          title={item.title}
                          type={item.type}
                          key={i}
                          classPref="app__header__menu__primary__list"
                          purpose={item.purpose}
                        />
                      )
                }
              </ul>
            </div>
            <div className="app__header__menu__side">
              <ul className="app__header__menu__side__list">
                {
                  this.props.user.data.email
                    ? this.loggedSideList
                      .map((item, i) => 
                        <MenuItem
                          title={item.title}
                          type={item.type}
                          cb={item.cb}
                          key={i}
                          classPref="app__header__menu__side__list"
                          url={item.url}
                        />)
                    : this.unLoggedSideList
                      .map((item, i) => 
                        <MenuItem
                          title={item.title}
                          type={item.type}
                          cb={item.cb}
                          key={i}
                          classPref="app__header__menu__side__list"
                          url={item.url}
                        />
                      )
                }
              </ul>
            </div>
          </div>
        </div>
      )
  }

  handleLogOutBtn() {
    this.props.user.resetUser()
  }

  handleLogInBtn() {
    this.props.app.setShowLogRegModal({
      status: true,
      showCase: true,
      addStyle: {
        filter: 'blur(12px)'
      }
    })
  }
}
