"use client"

import style from "../styles/social.module.css";
import socialIcons from "./utils/socialIcons";
import Link from "next/link";
import { useSprings, animated } from "@react-spring/web";

const social = {
  cv: {
    url: "/about",
  },
  github: {
    url: "https://github.com/arrudaricardo/",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/ricardodearruda/",
  },
  email: {
    url: "mailto:ricardo@arruda.dev?subject=Hey%20Ricardo.&body=",
  },
};

const socialList = Object.keys(social).map((s) => ({
  element: socialIcons[s],
  type: s as keyof typeof social,
}));

const randomColor = () =>
  "#" + (Math.random().toString(16) + "000000").substring(2, 8);

export default function Social() {
  const socialSpring = useSprings(
    socialList.length,
    socialList.map((_, i) => {
      const color = randomColor();
      return {
        delay: i * 150 + 4500,
        config: { mass: 0.5, tension: 350, friction: 20 },
        from: {
          transform: "scale(1)",
          color: "white",
        },
        to: {
          transform: "scale(1.5)",
          color,
        },
      };
    }),
  );

  return (
    <div className={style.container}>
      <div className={style["social-home"]}>
        {socialSpring.map((s, i) => {
          const url = social[socialList[i].type].url;
          const iconElement = socialList[i].element;
          return (
            <Link
              key={i}
              href={url}
              target={url.includes("http") ? "_blank" : "_self"}
            >
              <animated.div
                style={s}
                children={iconElement({ className: style.icon })}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
