import { LanguageAction } from '../actions'
import { StoreState } from '../types'
import { SET_LANGUAGE } from '../constants'

export function app(state: StoreState, action: LanguageAction): StoreState {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }

    default:
      return state
  }
}