import { Link, Route, Switch } from 'wouter'
import { Home } from './pages/Home'

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about">asdf</Route>
      <Route>
        <h1>Page not found</h1>
        <Link href="/">Back home</Link>
      </Route>
    </Switch>
  )
}

export default function App() {
  return <Routes />
}
