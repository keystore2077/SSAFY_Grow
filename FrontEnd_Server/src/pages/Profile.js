//김태형
import React, { useEffect, useState, useRef } from "react";
import PlantCard from "../components/plant/plantCard";
import Withdrawal from "../components/Withdrawal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import NavTop from "../components/NavTop";
// import Footer from "../components/Footer";
import "./Profile.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userSlice";
import homevideo2 from "../assets/homevideo2.mp4";
import { BASE_URL } from "../utils/Urls";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const token = currentUser.token;
  console.log(token);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const [growinPlant, setGrowinPlant] = useState([]);
  const [plantComplete, setPlantComplete] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(4);  //슬라이드 갯수 조정
  const calculateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setSlidesPerView(4);
    } else if (width >= 1000) {
      setSlidesPerView(3);
    } else if (width >= 770) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(2);
    }
  };
  useEffect(() => {
    calculateSlidesPerView();
    window.addEventListener("resize", calculateSlidesPerView);
    return () => {
      window.removeEventListener("resize", calculateSlidesPerView);
    };
  }, []);

  const withdrawal = async () => {
    console.log("회원탈퇴")
    try {
      const response = await axios.delete(`${BASE_URL}/api/user/`, config);
      alert(response.data.message);
      dispatch(logoutUser());
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };
  // 식물 종 데이터 변경할 메서드
  const getPlants = async () => {
    console.log("보내기 " + token);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/plant/myplant/`,
        config
      );
      console.log(response.data.data);
      const plantsList = response.data.data;
      const growing = plantsList.filter((plant) => plant.complete === 0);
      const complete = plantsList.filter((plant) => plant.complete === 1);
      setGrowinPlant(growing);
      setPlantComplete(complete);
      console.log(growinPlant);
      console.log(plantComplete);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPlants();
  }, []);

  const NotcompleteCardSet = () => {
    console.log(growinPlant);
    return (
      <div className="cardContainer">
        {growinPlant.map((plant) => (
          <SwiperSlide key={plant.index}>
            <PlantCard props={plant} />
          </SwiperSlide>
        ))}
      </div>
    );
  };

  const completeCardSet = () => {
    return (
      <div className="cardContainer">
        {plantComplete.map((plant) => (
          <SwiperSlide key={plant.index}>
            <PlantCard props={plant} />
          </SwiperSlide>
        ))}
      </div>
    );
  };

  const createCard = () => {
    navigate("/plantinfo");
  };
  const [showInProgress, setShowInProgress] = useState(true);

  return (
    <div className="profile-total">
      <NavTop />
      <div className="profilepage container">
        <div className="profile-row">
          <div className="container profile row">
            <div className="col-12">
              <h1 className="profile_title">PROFILE</h1>
            </div>
            <div className="button-container">
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowInProgress(true)}
                >
                  진행중인 식물
                </button>
                <span> | </span>
                <button
                  className="btn btn-success"
                  onClick={() => setShowInProgress(false)}
                >
                  완료된 식물
                </button>
              </div>
              <Withdrawal  withdrawal={withdrawal}>
                회원탈퇴
              </Withdrawal>
            </div>

            <div className="container plant">
              {showInProgress && (
                <div className="plant-ing">
                  <div>
                    <Swiper
                      slidesPerView={slidesPerView}
                      spaceBetween={30}
                      freeMode={true}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[FreeMode, Pagination]}
                      className="mySwiper"
                    >
                      {NotcompleteCardSet()}
                      <SwiperSlide>
                        <div className="plantcard">
                          <div className="bg">
                            <div className="plantcard-details">
                              <h5>
                                새 식물친구
                                <br />
                                등록해주기
                              </h5>
                            </div>
                          </div>
                          <div className="blob"></div>
                          <button
                            className="button type1 plantcard-button"
                            onClick={createCard}
                          >
                            <span className="btn-txt">+</span>
                          </button>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              )}
              {!showInProgress && (
                <div className="plant-complete">
                  <Swiper
                    slidesPerView={slidesPerView}
                    spaceBetween={20}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                  >
                    {completeCardSet()}
                  </Swiper>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
