import { social } from '../config.json'
import style from '../styles/social.module.css'
import socialIcons from './utils/socialIcons'
import Link from 'next/link'
import { useSprings, animated } from '@react-spring/web'

type ISocial = typeof social
const socialList = Object.keys(social).map((s) => ({ element: socialIcons[s], type: s as keyof ISocial }))

const randomColor = () =>
  '#' + (Math.random().toString(16) + "000000").substring(2, 8)


interface Props {
  hasPosts?: boolean
}

const Social = ({ hasPosts }: Props) => {

  const socialSpring = useSprings(socialList.length,
    socialList.map((_, i) => {
      const color = randomColor()
      return ({
        delay: (i * 150) + 4500,
        config: { mass: 0.5, tension: 350, friction: 20 },
        from: {
          transform: "scale(1)",
          color: "white"
        },
        to: {
          transform: "scale(1.5)",
          color
        }
      })
    })
  )

  return (
    <div className={style.container}>
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
      {hasPosts &&
        <Link href='/posts'>
          <a>Posts</a>
        </Link>
      }
    </div>
  )
}

export default Social
