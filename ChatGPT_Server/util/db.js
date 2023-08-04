const maria = require("mysql");
const winston = require("./winston.js");
const util = require("util");

const connection = maria.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// MariaDB connection 실행
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const query = util.promisify(connection.query).bind(connection);

// 시리얼 넘버 확인하기
const checkSerial = async (serial) => {
  let sql = "select * from `pot` where `serial_number`=?";

  try {
    let result = await query(sql, [serial]);
    
    if (result.length == undefined || result.length === 0) {
      return "not exist";
    } else if (result[0].member_index == null) {
      return "unregistered";
    } 
    return "ok";
  } catch (error) {
    winston.error(error);
    return "error";
  }

  // connection.query(query, [serial], (error, result) => {
  //   console.log(result);
  //   console.log(error);
  //   if (result.length == undefined || result.length === 0) {
  //     return "not exist";
  //   } else if (result[0].member_index == null) {
  //     return "unregistered";
  //   } else if (error) {
  //     winston.error(error);
  //     return "error";
  //   }
  //   return "ok";
  // });
};

// 사용자의 입력과 gpt의 대답을 기록하기
const saveChatLog = (log) => {
  let query = "insert into `chat_log` (`plant_index`, `role`, `content`) values (?, ?, ?)"
  connection.query(query, [log.plantIndex, log.role, log.content], (error, result) => {
    if (error) {
      winston.error(error);
      return "error";
    }
    return "ok";
  });
}

// 식물 상황 받아오기
const getCondition = (plantIndex) => {
  let query = "select * from `plant_condition` where `plant_index` = ? order by `measurement_date` desc limit 1"
  connection.query(query, [plantIndex], (error, result) => {
    if (error) {
      winston.error(error);
      return "error";
    }
    return result;
  });
}

// 식물 물준 기록 받아오기
const getWaterLog = (plantIndex) => {
  let query = "select * from `water_log` where plant_index = ?"
  connection.query(query, [plantIndex], (error, result) => {
    if (error) {
      winston.error(error);
      return "error";
    }
    return result;
  });
}

// 식물 종의 정보 받아오기
const getPlantInfoByIndex = (index) => {
  let query = "select * from `plant_info` where index = ?"
  connection.query(query, [index], (error, result) => {
    if (error) {
      winston.error(error);
      return "error";
    }
    return result;
  });
};
 

module.exports = {
  connection,
  checkSerial,
  saveChatLog,
  getCondition,
  getWaterLog,
  getPlantInfoByIndex
};
