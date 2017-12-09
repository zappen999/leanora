import * as React from 'react'
import * as styles from './App.scss'
import TitleContainer from 'features/title/components'
const logo = require('../assets/logo.svg')

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img
          src={logo}
          className={styles.appLogo}
          alt="logo"
        />

        <h2>Welcome to React TS</h2>
      </div>

      <p className={styles.appIntro}>
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>

      <TitleContainer />

      <div className={styles.appLead}>
        {`Aonther test`}
      </div>
    </div>
  )
}

export default App
