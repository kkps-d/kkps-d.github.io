import { Home } from './pages/Home'
import resume from 'virtual:resume'

export default function App() {
  return <Home resume={resume} />
}
