import style from "../styles/home.module.css";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const Home = ({ children }: Props) => {
  return (
    <div className={style.center}>
      {children}
    </div>
  );
};

export default Home;
