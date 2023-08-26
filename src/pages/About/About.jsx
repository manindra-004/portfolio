import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import NIIT from "../../assets/images/NIIT.jpeg";
import vision40 from "../../assets/images/vision40.png";
import scts from "../../assets/images/scts.jpeg";
import scts2 from "../../assets/images/scts2.jpeg";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            I'm a passionate programmer, who is always looking for new
            challenges to improve myself, also a team player, who is always
            ready to learn new things and help others.
            <br />I was born and raised in Hyderabad, India. I love to watch movies, anime
            and play video games.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "NIIT University",
                p: "Bachelors of Computer Engineering (2020-2024)",
                image: NIIT,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Vision 40 College, Hyderabad",
                p: "High School (2018-2020)",
                image: vision40,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: "Sri Chaitanya, Hyderabad",
                p: "Secondary Education (2007-2017)",
                image: scts,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "St.Joseph's, Hyderabad",
                p: "Secondary Education (2006-2007)",
                image: scts2,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
