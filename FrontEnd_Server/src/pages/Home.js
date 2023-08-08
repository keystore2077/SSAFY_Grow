import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import "./Home.scss";
import NavTop from "../components/NavTop";
import Footer from "../components/Footer";
import Service1 from "../components/home/Service1";
import Service2 from "../components/home/Service2";
import Service3 from "../components/home/Service3";
import "./MainVideoBackground.css";
import homevideo1 from "../assets/homevideo1.mp4";
import { ScrollToTopOnMount, SectionsContainer, Section } from 'react-fullpage';

function HomeBackground() {
  return (
    <video autoPlay loop muted>
      <source src={homevideo1} type="video/mp4" />
    </video>
  );
}

const Home = () => {
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour',],
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a hash in the URL and scroll to the corresponding section
    navigate('/home#sectionOne')
  }, []);
  return (
    <>
      <SectionsContainer {...options}  className="home-main-container" >
        <Section anchor="sectionOne" className={`video-background content-home `}>
          <HomeBackground />
          <NavTop className="homenav" />
          <div className="content">
            <div className="home_container">
              <div className="home_title">
                <h1>Find friend for your kids</h1>
                <h4>This service makes plant friends for your children</h4>
                <h4>so that they can develop emotionally.</h4>
              </div>
            </div>
          </div>
        </Section>
        <Section anchor="sectionTwo" className={`content-home `}>
          <Service1 />
        </Section>
        <Section anchor="sectionThree" className={`content-home `}>
          <Service2 />
        </Section>
        <Section anchor="sectionFour" className={`content-home `}>
          <Service3 />
        </Section>
      </SectionsContainer>
    </>
  );
};

export default Home;
