import * as React from 'react'
import './style.scss'

export interface Props {
  text: string,
  size?: number,
  onSetLanguage?: (lang: string) => void
}

export default function Title({text, size = 11, onSetLanguage}: Props) {
  return (
    <div
      style={{fontSize: size}}
      className={'title'}
    >
      {text}

      <button
        className="button"
        onClick={() => onSetLanguage && onSetLanguage('EN')}
      >
        {`set`}
      </button>
    </div>
  )
}
