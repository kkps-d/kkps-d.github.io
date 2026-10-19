import { useState } from 'react'
import { Link, Route, Switch } from 'wouter'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <p>A fresh start, with wouter for routing.</p>
      <button onClick={() => setCount((value) => value + 1)}>
        Count is {count}
      </button>
      <p className="hint">Edit src/App.jsx to get started.</p>
    </>
  )
}

export default function App() {
  return (
    <div className="app">
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about">
            <h1>About</h1>
            <p>Built with React, Vite, wouter, and plain CSS.</p>
            <Link href="/">Back home</Link>
          </Route>
          <Route>
            <h1>Page not found</h1>
            <Link href="/">Back home</Link>
          </Route>
        </Switch>
      </main>
    </div>
  )
}
