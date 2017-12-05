import * as constants from '../constants'

export interface SetLanguage {
  type: constants.SET_LANGUAGE,
  payload: string
}

export type LanguageAction = SetLanguage

export function setLanguage(lang: string): SetLanguage {
  return {
    type: constants.SET_LANGUAGE,
    payload: lang
  }
}
