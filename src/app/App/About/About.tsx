import * as React from 'react'

import * as styles from './style.scss'

export interface Props {
  title: string,
  description: string
}

class About extends React.Component<Props, object> {
  public render() {
    return (
      <div className={ styles.about }>
        <div>
          { this.props.title }
        </div>

        <div className={ styles.subClass }>
          { this.props.description }
        </div>
      </div>
    )
  }
}

export default About
