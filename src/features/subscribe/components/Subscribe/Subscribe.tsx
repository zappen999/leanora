import * as React from 'react'

import * as styles from './Subscribe.scss'

export interface Props {
  api: string
}
export interface State {
  email: string
}

class Subscribe extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this._handleChange = this._handleChange.bind(this)
    this._submit = this._submit.bind(this)

    this.state = { email: '' }
  }

  public render() {
    return (
      <div className={ styles.subscribe } >
        <form
          onSubmit={ this._submit }
          className={ styles.form }
        >
          <input
            onChange={ this._handleChange }
            value={ this.state.email }
          />
        </form>
      </div>
    )
  }

  private async _submit(e: React.FormEvent<HTMLFormElement>): Promise<boolean> {
    e.preventDefault()
    // TODO: Send mail registration
    return true
  }

  private _handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ email: e.currentTarget.value })
  }
}

export default Subscribe
