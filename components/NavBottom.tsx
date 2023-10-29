import Social from "./Social";
import Link from "next/link";
import style from "../styles/navbottom.module.css";

export default function NavBottom() {
  return (
    <header id="site-header" className={style.root}>
      <div className={style.wrapper}>
        <div className={style.navLeft}>
          <nav className={style.nav}>
            <Link href={"/posts"}>Posts</Link>
          </nav>
        </div>
        <div className={style.navRight}>
          <Social />
        </div>
      </div>
    </header>
  );
}
