import React from "react";
import Calendar from "../components/Calendar";
import MyInfo from "../components/MyInfo";
import { Container, Grid } from "@mui/material";
import NavTop from "../components/NavTop";
import QuestPage from "../components/QuestPage";
import "./PlantDiary.scss";

const PlantDiary = () => {
  return (
    <div className="diary_total">
      <NavTop />
      <div className="top_section">
        <h1 style={{fontSize: "100px"}}>화분 일지</h1>
      </div>
      <Container className="centered-elements">
        {/* <h1 className='diary_title'>plant Diary</h1> */}
        <Grid container className="diary-container" spacing={2}>
          <Grid item xs={12} md={5}>
            <MyInfo />
            <Calendar />
          </Grid>
          <Grid item xs={12} md={7}>
            <QuestPage />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PlantDiary;
