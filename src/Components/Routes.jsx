import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Objectives from './components/Wizard'
import Infos from './components/Infos'
import HomePage from './components/HomePage'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route exact path='/infos' component={ Infos } />
          <Route exact path='/objectives' component={ Objectives } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )