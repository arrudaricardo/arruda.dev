"use client";

import HomeComponent from "../components/Home";
import Social from "../components/Social";
import Iam from "../components/Iam";
import style from "../styles/home.module.css";
import {
  useSpring,
  useChain,
  animated,
  useSpringRef,
  config,
} from "@react-spring/web";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  // TODO: Need this in order to see initial animation. Investigate and fix.
  const [display, setDisplay] = useState(false);

  const titleSpringColor = useSpring({
    loop: true,
    config: config.slow,
    to: {
      color: "white",
      textShadow: "-1px 5px 1px blueviolet",
    },
    from: {
      textShadow: "-1px 5px 1px blueviolet",
      color: "white",
    },
  });

  const titleRef = useSpringRef();
  const titleSpring = useSpring({
    delay: 100,
    ref: titleRef,
    config: {
      ...config.stiff,
      clamp: false,
    },
    from: { fontSize: "0rem" },
    to: { fontSize: "2.5rem" },
  });

  const socialRef = useSpringRef();
  const socialSpring = useSpring({
    ref: socialRef,
    config: config.gentle,
    delay: 200,
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const iamRef = useSpringRef();
  const iamSpring = useSpring({
    ref: iamRef,
    from: { opacity: 0, height: "0rem" },
    to: { opacity: 1, height: "3.8rem" },
  });

  useChain([titleRef, socialRef, iamRef]);

  useEffect(() => {
    setDisplay(true);
  }, []);

  return (
    <HomeComponent>
      {display ? (
        <>
          <animated.div
            className={style["title-container"]}
            style={titleSpring}
          >
            <animated.h1 style={titleSpringColor} className={style.title}>
              Ricardo de Arruda
            </animated.h1>
          </animated.div>
          <animated.div style={iamSpring}>
            <Iam />
          </animated.div>
          <animated.div style={socialSpring}>
            <div className={style.social}>
              <Social />
              <Link href={"/posts"}>Posts</Link>
            </div>
          </animated.div>
        </>
      ) : (
        <div></div>
      )}
    </HomeComponent>
  );
}
