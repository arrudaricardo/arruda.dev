import { useEffect, useState, useCallback, useRef } from 'react'
import { animated, useTransition, config } from '@react-spring/web'
const { IamList } = iam

import { iam } from '../config.json'
import style from '../styles/iam.module.css'
const Iam = () => {
  const ref = useRef<ReturnType<typeof setTimeout>[]>([])
  const [iamA, setIamA] = useState<number>(0)
  const [iamB, setIamB] = useState<number>(0)

  const transitionA = useTransition(
    iamA,
    {
      config: config.wobbly,
      from: {
        transform: 'translate3d(0, 3rem ,0)',
        fontSize: '1.5rem',
        opacity: 0
      },
      enter: {
        fontSize: '1.6rem',
        transform: 'translate3d(0, 0rem, 0)',
        opacity: 1,
      },
      // leave: { display: "flex", fontSize: "100rem" },
      // leave: { transform: 'translate3d(0,30px,0)', opacity: 0 },
    })

  const transitionB = useTransition(
    iamB,
    {
      trail: 200,
      config: config.wobbly,
      from: {
        transform: 'translate3d(0, -3rem, 0)',
        fontSize: '1.5rem',
        opacity: 0
      },
      enter: {
        transform: 'translate3d(0, 0rem, 0)',
        fontSize: '1.6rem',
        opacity: 1,
      },
      // leave: { fontSize: '1rem' },
    })


  const reset = useCallback(() => {
    const delay = 2500
    ref.current.forEach(clearTimeout)
    ref.current = []
    ref.current.push(setInterval(() => setIamA(i => (i! + 1) % IamList.length), delay))
    ref.current.push(setInterval(() => setIamB(i => (i! + 1) % IamList.length), delay))
  }, [])

  useEffect(() => {
    // setInterval(() => setIamA(i => (i!+1) % IamList.length), 800)
    reset()
    return () => ref.current.forEach(el => clearTimeout(el))
  }, [])

  return (
    <div className={style.root}>
      {transitionA((s, i) => {
        return (
          <animated.div style={s} >
            {IamList[i][0]}
          </animated.div>
        )
      })}
      {transitionB((s, i) => {
        return (
          <animated.div style={s}>
            {IamList[i][1]}
          </animated.div>
        )
      })}
    </div>
  )
}

export default Iam
