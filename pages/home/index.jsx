import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import iconNavBack from '@src/assets/images/booking/nav-back.svg'

import {
  AppNavigation,
  ProgressBar,
} from '@src/components'
import { StepEl } from './step'

import sampleJSON from '@src/sample/sample.json'

export function HomePage(props) {
  const navigate = useNavigate()
  const { category = '0' } = useParams()

  React.useEffect(() => {
    const stepIndex = parseInt(category)
    setCurStepIndex(stepIndex)
  }, [category])

  const [curStepIndex, setCurStepIndex] = React.useState(0)
  const [stepCount, setStepCount] = React.useState(0)

  React.useEffect(() => {
    setStepCount(sampleJSON.steps?.length ?? 0)
  }, [sampleJSON])

  function handleBack(index) {
    if (index < 0) return

    setCurStepIndex(index)
    navigate(`/site/booking/${index}/`)
  }

  function handleNext(index) {
    if (index >= stepCount) return

    setCurStepIndex(index)
    navigate(`/site/booking/${index}/`)
  }

  return (
    <div id="parent" className="home">
      <AppNavigation />
      <ProgressBar progress={parseFloat((curStepIndex + 1) / sampleJSON.steps?.length)} />
      <div className="home-wrapper relative">
        {sampleJSON.steps.map((step, index) => {
          return (
            <StepEl
              key={index}
              className={`${curStepIndex !== index && 'hidden'}`}
              owner={sampleJSON.owner}
              {...step}
              onNext={() => handleNext(curStepIndex + 1)} />
          )
        })}
        {curStepIndex > 0 &&
          <button
            className="nav-back absolute top-11 left-4 flex items-center"
            onClick={() => handleBack(curStepIndex - 1)}>
            <img className="px-5 py-2" src={iconNavBack} alt="" />
            <span className="text-lg" style={{ color: '#22252D' }}>Back</span>
          </button>
        }
        {curStepIndex < (stepCount - 1) &&
          <button
            className="nav-back absolute top-11 right-4 flex items-center"
            onClick={() => handleNext(curStepIndex + 1)}>
            <span className="text-lg" style={{ color: '#22252D' }}>Next</span>
            <img className="px-5 py-2" style={{ transform: 'rotate(180deg)' }} src={iconNavBack} alt="" />
          </button>
        }
      </div>
    </div>
  )
}
