import React, { useEffect, useRef, useState } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./styles.module.css";
import SocialLinks from "./components/_SocialLinks";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const mainRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(1536);
  const [bannerHeight, setBannerHeight] = useState(256);

  useEffect(() => {
    const tempHeaderHeight = Math.max(384, window.innerHeight);
    setHeaderHeight(tempHeaderHeight);
    setBannerHeight(Math.max(256, tempHeaderHeight / 2));
    setIsLoading(false);
    mainRef.current.hidden = false;
  }, []);

  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.heroBanner} style={{ minHeight: headerHeight }}>
        <div
          className={styles.heroBannerWrapper}
          style={{ minHeight: bannerHeight, display: isLoading ? "none" : "block" }}
        >
          <p>Hi, my name is</p>
          <h1 className="text-success">Kundan Kumar.</h1>
          <p>
            I am a <span className="text-warning">Software Engineer</span> and{" "}
            <span className="text-danger">Cloud Engineer</span> passionate about
            solving meaningful problems.
          </p>
          <SocialLinks />
          <p>
            <Link to={useBaseUrl("#main")}>
              <button className="border-0 rounded p-2 pl-4 pr-0 bg-primary-900 hover:bg-primary-800 transition text-white text-lg cursor-pointer">
                whoami<span className="pl-1 animate-pulse">▎</span>
              </button>
            </Link>
          </p>
        </div>
      </header>
      <main id="main" ref={mainRef} hidden={true}>
      <div className={styles.aboutHeader}>
        <h2 className="border-0 border-b-4 border-solid border-success">Who am I</h2>
      </div>
       <div className={styles.about}>
          <div>
            <img
              className={styles.aboutProfilePic}
              src={useBaseUrl("img/profilepic.jpg")}
            />
          </div>
          <div class={styles.aboutText}>
            <h2>Hi</h2>
            <p>
              I am Kundan, a Software Engineer with 4 years of experience in software development. I am currently exploring Distributed Systems & Database Internals.
            </p>
            <p>
              🚀 I love experimenting with tools & languages. Please checkout my recent  {" "}
              <Link to={useBaseUrl("projects/")}>
                projects
              </Link>
              .
            </p>
            <p>
              👨‍💻 I have been writing code at <a href="https://jpmorgan.com">JP Morgan</a>{" "}
              since 2020.
            </p>
            <p>
              🎒 I was a{" "}
              <a>
                Electronics & Communication
              </a>{" "}
              major at the{" "}
              <a href="https://www.iitr.ac.in/">
                IIT Roorkee
              </a>{" "}
              from 2016 to 2020.
            </p>
            <p>
              When not coding, I like to travel & trek to adventurous places.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
