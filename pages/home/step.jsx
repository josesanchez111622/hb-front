import React from 'react'

import { ArrayHelper } from '@src/utils'

import sampleAvatar from '@src/assets/images/sample/homeowner-1.png'

export function StepEl({
  className = "",
  owner,
  title,
  answers,
  onNext = () => { }
}) {
  const { avatar, name, position } = owner

  return (
    <div className={`${className} booking-step py-20 max-w-screen-md mx-auto flex flex-col items-center`}>
      {!ArrayHelper.isValid(answers) ?
        <React.Fragment>
          <div className="w-24 h-24" style={{ borderRadius: 48, }}>
            <img style={{ width: '100%', height: '100%' }} src={sampleAvatar} alt={name} />
          </div>
          <div className="mt-3 text-lg text-black opacity-60">{name}, {position}</div>
          <h1 className="mt-6 text-center text-5xl">{title}</h1>
          <button
            className="mt-6 h-16 text-white text-xl rounded"
            style={{ width: 220, background: '#0627F9' }}
            onClick={() => onNext()}>
            Let's do this
          </button>
        </React.Fragment>
        :
        <React.Fragment>
          <div className="w-15 h-15" style={{ borderRadius: 48, }}>
            <img style={{ width: '100%', height: '100%' }} src={sampleAvatar} alt={name} />
          </div>
          <h1 className="mt-6 text-center text-5xl">{title}</h1>
          {answers.map((answer, index) => {
            return (
              <button
                key={index}
                className="mt-6 h-16 text-white text-xl rounded"
                style={{ width: 220, background: '#0627F9' }}
                onClick={() => onNext()}>
                {answer}
              </button>
            )
          })}
        </React.Fragment>
      }
    </div>
  )
}
