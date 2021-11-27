import { social } from '../config.json'
import style from '../styles/social.module.css'
import socialIcons from './utils/socialIcons'
// import {useState} from 'react'
import { useSprings, animated, config } from '@react-spring/web'

type ISocial = typeof social
const socialList = Object.keys(social).map((s) => ({ element: socialIcons[s], type: s as keyof ISocial }))

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

const Social = () => {

  const socialSpring = useSprings(socialList.length,
    socialList.map((_, i) => ({
      delay: ((i + 1) * 300) + 3000,
      config: config.molasses,
      from: {
        transform: "scale(1)",
        color: "white"
      },
      to: {
        transform: "scale(1.3)",
        color: randomColor()
      }
    }))
  )

  return (
    <div className={style["social-home"]}>
      {
        socialSpring.map((s, i) => {
          const url = social[socialList[i].type].url
          const iconElement = socialList[i].element
          return (
            <animated.a
              key={i}
              href={url}
              target={url.includes('http') ? "_blank" : "_self"}
              style={s}
              children={
                iconElement({ className: style.icon })
              }
            />)
        }
        )
      }

    </div>
  )
}

export default Social
