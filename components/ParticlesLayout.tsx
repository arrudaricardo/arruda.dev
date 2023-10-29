"use client";

import { ReactElement, ReactNode } from "react";
import styles from "../styles/layout.module.css";
import Particles from "react-tsparticles";

import { useCallback } from "react";
import type {
  Container,
  Engine,
  RecursivePartial,
  IOptions,
} from "tsparticles-engine";
import { loadFull } from "tsparticles";

export type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    [],
  );

  const particlesOptions: RecursivePartial<IOptions> = {
    autoPlay: true,
    background: {
      color: {
        value: "#000000",
      },
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
      opacity: 1,
    },
    backgroundMask: {
      composite: "destination-out",
      cover: {
        color: {
          value: "#fff",
        },
        opacity: 1,
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
    duration: 0,
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onDiv: {
          selectors: ["#iam0", "#iam1"],
          enable: true,
          mode: "bounce",
          type: "rectangle",
        },
        onHover: {
          enable: true,
          mode: "connect",
          parallax: {
            enable: true,
            force: 100,
            smooth: 50,
          },
        },
        resize: true,
      },
      modes: {
        attract: {
          distance: 100,
          duration: 0.4,
          easing: "ease-out-quad",
          factor: 1,
          maxSpeed: 50,
          speed: 1,
        },
        bounce: {
          distance: 200,
        },
        bubble: {
          distance: 400,
          duration: 2,
          mix: false,
          opacity: 0.8,
          size: 40,
        },
        connect: {
          distance: 50,
          links: {
            opacity: 0.5,
          },
          radius: 60,
        },
        grab: {
          distance: 400,
          links: {
            blink: false,
            consent: false,
            opacity: 1,
          },
        },
        light: {
          area: {
            gradient: {
              start: {
                value: "#ffffff",
              },
              stop: {
                value: "#000000",
              },
            },
            radius: 1000,
          },
          shadow: {
            color: {
              value: "#000000",
            },
            length: 2000,
          },
        },
        push: {
          default: true,
          groups: [],
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
          factor: 100,
          speed: 2,
          maxSpeed: 50,
          easing: "ease-out-quad",
        },
        slow: {
          factor: 3,
          radius: 200,
        },
        trail: {
          delay: 1,
          pauseOnStop: false,
          quantity: 1,
        },
      },
    },
    manualParticles: [],
    motion: {
      disable: false,
      reduce: {
        factor: 4,
        value: true,
      },
    },
    particles: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
      },
      collisions: {
        bounce: {
          horizontal: {
            random: {
              enable: true,
              minimumValue: 0.5,
            },
            value: 1,
          },
          vertical: {
            random: {
              enable: true,
              minimumValue: 0.5,
            },
            value: 1,
          },
        },
        enable: true,
        mode: "bounce",
        overlap: {
          enable: true,
          retries: 0,
        },
      },
      color: {
        value: "random",
        animation: {
          h: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          s: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          l: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
        },
      },
      destroy: {
        mode: "none",
        split: {
          count: 10,
          factor: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 3,
          },
          rate: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: {
              min: 1,
              max: 18,
            },
          },
          sizeOffset: true,
        },
      },
      gradient: [],
      groups: {},
      life: {
        count: 1,
        delay: {
          random: {
            enable: true,
            minimumValue: 0,
          },
         value: 80,
          sync: false,
        },
        duration: {
          random: {
            enable: true,
            minimumValue: 50,
          },
          value: 100,
          sync: false,
        },
      },
      links: {
        blink: false,
        color: {
          value: "#ffffff",
        },
        consent: false,
        distance: 150,
        enable: false,
        frequency: 1,
        opacity: 0.4,
        shadow: {
          blur: 5,
          color: {
            value: "#00ff00",
          },
          enable: false,
        },
        triangles: {
          enable: false,
          frequency: 1,
        },
        width: 1,
        warp: false,
      },
      move: {
        angle: {
          offset: 0,
          value: 90,
        },
        attract: {
          distance: 10,
          enable: true,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        decay: 0.0001,
        distance: {},
        direction: "none",
        drift: 0,
        enable: true,
        gravity: {
          acceleration: 9.81,
          enable: false,
          inverse: false,
          maxSpeed: 50,
        },
        path: {
          clamp: true,
          delay: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
          },
          enable: false,
          options: {},
        },
        outModes: {
          default: "out",
          bottom: "out",
          left: "out",
          right: "out",
          top: "out",
        },
        random: false,
        size: false,
        speed: 3,
        spin: {
          acceleration: 0,
          enable: false,
        },
        straight: false,
        trail: {
          enable: true,
          length: 2,
          fillColor: {
            value: "#000000",
          },
        },
        vibrate: false,
        warp: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
          factor: 1000,
        },
        limit: 0,
        value: 100,
      },
      opacity: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 2,
        animation: {
          count: 5,
          enable: true,
          speed: 0.2,
          sync: false,
          destroy: "none",
          startValue: "random",
          minimumValue: 0.1,
        },
      },
      orbit: {
        animation: {
          count: 100,
          enable: true,
          speed: 100,
          sync: false,
        },
        enable: true,
        opacity: 1,
        rotation: {
          random: {
            enable: true,
            minimumValue: 50,
          },
          value: 100,
        },
        width: 10,
      },
      reduceDuplicates: true,
      repulse: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 10,
        enabled: true,
        distance: 1,
        duration: 1,
        factor: 1,
        speed: 1,
      },
      roll: {
        darken: {
          enable: false,
          value: 0,
        },
        enable: false,
        enlighten: {
          enable: false,
          value: 0,
        },
        mode: "vertical",
        speed: 25,
      },
      rotate: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          sync: false,
        },
        direction: "clockwise",
        path: false,
      },
      shadow: {
        blur: 0,
        color: {
          value: "#000000",
        },
        enable: false,
        offset: {
          x: 0,
          y: 0,
        },
      },
      shape: {
        type: ["image"],
        options: {
          image: [
            "chrome.png",
            "aws.png",
            "docker.png",
            "gcp.png",
            "nodejs.png",
            "postgresql.png",
            "react.png",
            "elixir.png",
            "golang.png",
            "html5.png",
            "internet_explorer.png",
            "javascript.png",
            "python.png",
            "ruby.png",
            "rust.png",
            "safari.png",
            "typescript.png",
          ].map((src) => ({
            src: `/img/${src}`,
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 14,
              },
            },
          })),
        },
      },
      size: {
        random: {
          enable: true,
          minimumValue: 8,
        },
        value: {
          min: 5,
          max: 14,
        },
        animation: {
          count: 0,
          enable: false,
          speed: 40,
          sync: false,
          destroy: "max",
          startValue: "random",
          minimumValue: 0.1,
        },
      },
      stroke: {
        width: 0,
      },
      tilt: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          sync: false,
        },
        direction: "clockwise",
        enable: false,
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 1,
          opacity: 1,
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
      },
      wobble: {
        distance: 1,
        enable: true,
        speed: 1,
      },
      zIndex: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 1,
        opacityRate: 1,
        sizeRate: 1,
        velocityRate: 1,
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    responsive: [],
    themes: [],
    zLayers: 100,
  };

  return (
    <div className={styles.body}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
