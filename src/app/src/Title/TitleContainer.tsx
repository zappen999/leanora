import { connect, Dispatch } from 'react-redux'

import Title from './Title'
import * as actions from '../actions'
import { StoreState } from '../types'

export function mapStateToProps({ language }: StoreState) {
  return {
    text: language
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.LanguageAction>) {
  return {
    onSetLanguage: (lang: string) =>
      dispatch(actions.setLanguage(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Title)