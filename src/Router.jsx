import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Body from './Body.jsx';
import Roster from './Roster.jsx';
import Chat from './ChatTwo.jsx';

const Router = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Body}/>
      <Route exact path='/chat' component={Chat}/>
      <Route path='/roster/:id' render={props => <Roster {...props} /> }/>
    </Switch>
  </main>
)

export default Router
