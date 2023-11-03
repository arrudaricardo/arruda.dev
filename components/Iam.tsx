import { useEffect, useState, useCallback, useRef } from "react";
import { animated, useTransition } from "@react-spring/web";
import style from "../styles/iam.module.css";
const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

const Iam = () => {
  const ref = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [iamA, setIamA] = useState<number>(0);
  const [iamB, setIamB] = useState<number>(0);

  const IamList = [
    ["I'm a", "Full-Stack Dev 👨‍💻"],
    ["I ❤️️", "the web"],
  ];

  const config = { mass: 1, tension: 180, friction: 10 };
  const transitionA = useTransition(iamA, {
    config,
    from: {
      transform: "translate3d(0, 4rem ,0)",
      fontSize: "1.5rem",
      opacity: 0,
    },
    enter: {
      fontSize: "1.7rem",
      transform: "translate3d(0, -1.5rem, 0)",
      textShadow: `-1px 4px 3px ${randomColor}`,
      opacity: 1,
    },
  });

  const transitionB = useTransition(iamB, {
    config,
    from: {
      transform: "translate3d(0, -5rem, 0)",
      fontSize: "1.5rem",
      opacity: 0,
    },
    enter: {
      transform: "translate3d(0, -1.5rem, 0)",
      fontSize: "1.7rem",
      textShadow: `-1px 4px 3px ${randomColor}`,
      opacity: 1,
    },
  });

  const reset = useCallback(() => {
    const delay = 3500;
    ref.current.forEach(clearTimeout);
    ref.current = [];
    ref.current.push(
      setInterval(() => setIamA((i) => (i! + 1) % IamList.length), delay),
    );
    ref.current.push(
      setInterval(() => setIamB((i) => (i! + 1) % IamList.length), delay),
    );
  }, []);

  useEffect(() => {
    // setInterval(() => setIamA(i => (i!+1) % IamList.length), 800)
    reset();
    return () => ref.current.forEach((el) => clearTimeout(el));
  }, []);

  return (
    <div className={style.root}>
      {transitionA((s, i) => {
        return (
          <animated.div id="iam0" style={s}>
            {IamList[i][0]}
          </animated.div>
        );
      })}
      {transitionB((s, i) => {
        return (
          <animated.div id="iam1" style={s}>
            {IamList[i][1]}
          </animated.div>
        );
      })}
    </div>
  );
};

export default Iam;
