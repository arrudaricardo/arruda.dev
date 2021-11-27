import config from '../config.json'
import style from '../styles/home.module.css'
import { ReactElement } from 'react'


type Props = {
  children: ReactElement
}

const Home = ({children}: Props ) => {
  return (
  <div className={ style.center}>
      { children }
      { config.subTitle && <p className={ style.subtitle} >{ config.subTitle }</p> }
  </div>
  )
}



export default Home
