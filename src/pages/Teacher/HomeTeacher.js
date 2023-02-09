import React from "react";

import "./HomeTeacher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Card from "./../../components/ui/Card";
import { useEffect } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import { useUserDataContext } from "./../../hooks/useUserDataContext";
import useFetchStudents from "../../hooks/useFetchStudents";
import moment from "moment/moment";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes, { array } from "prop-types";
import _ from "lodash";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ErrorIcon from "@mui/icons-material/Error";

function addNumbers(obj) {
  let sum = 0;

  for (const value of Object.values(obj)) {
    if (typeof value === "number") {
      sum += value;
    } else if (typeof value === "object") {
      sum += addNumbers(value);
    }
  }

  return sum;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   // createData("Eclair", 262, 16.0, 24, 6.0),
//   // createData("Cupcake", 305, 3.7, 67, 4.3),
//   // createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const HomeTeacher = () => {
  const [students, setStudents] = useState([]);
  // const [rows, setRows] = useState([]);
  const [studentScores, setStudentScores] = useState([]);

  const { name } = useUserDataContext();

  const { myStudents } = useFetchStudents();
  console.log("mystudents", myStudents);

  useEffect(() => {
    myStudents && setStudents(myStudents);
  }, [myStudents]);

  console.log(students);

  // let rows = []

  // const rows = [

  // ];

  // console.log("rows", rows);

  console.log("momentdate", moment().format());

  console.log(name.firstName, name.lastName);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("fetchUsers ran");
      const data = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
      console.log("studentlist", data);
      const filteredData = data.filter(
        (item) =>
          item.userType === "student" &&
          item.teacher.name === `${name.firstName} ${name.lastName}` &&
          item.status === "enrolled"
      );
      setStudents(filteredData);
    };

    fetchUsers();
  }, [name]);

  useEffect(() => {
    const studentData = [];
    if (students.length === 0) return;
    students.forEach((item) => {
      const name = item.firstName + " " + item.lastName;
      console.log(item);
      const score = {
        letra: addNumbers(item?.scores?.letra),
        numero: addNumbers(item?.scores?.numero),
        tinaga: addNumbers(item?.scores?.tinaga),
      };
      studentData.push({ name, score });
    });
    setStudentScores(studentData);
  }, [students]);

  // useEffect(() => {
  //   students.length !== 0 &&
  //     setRows([
  //       ...students.map((student) =>
  //         // createData(
  //         //   `${student.quizHistory.quiztype} ${student.quizHistory.category}`,
  //         //   11,
  //         //   student.quizHistory.timestamp,
  //         //   student.quizHistory.dugangKomento
  //         // )

  //         {
  //           console.log("student map: ", student.quizHistory);
  //           const { category, quizType, score, timestamp, dugangKomento } =
  //             student.quizHistory;
  //           console.log("category createData:", student.quizHistory.category);
  //           return createData(
  //             `${_.capitalize(quizType)} ${category}`,
  //             student.quizHistory.score,
  //             timestamp,
  //             dugangKomento
  //           );
  //         }
  //       ),
  //     ]);
  // }, [students]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Dialog
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [studentIndex, setStudentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [komento, setKomento] = useState("");

  const handleClickOpen = (studentIndex, quizIndex) => {
    setOpenEditForm(true);
    // setCurrentKomento(index);
    setQuizIndex(quizIndex);
    setStudentIndex(studentIndex);
  };

  const handleKomentoSubmit = async () => {
    const docRef = doc(db, "users", students[studentIndex].userId);

    try {
      await updateDoc(docRef, {
        quizHistory: arrayUnion({
          ...students[studentIndex].quizHistory[quizIndex],
          dugangKomento: komento,
        }),
      });
      await updateDoc(docRef, {
        quizHistory: arrayRemove(students[studentIndex].quizHistory[quizIndex]),
      });
    } catch (error) {
      console.log(error);
    }

    setKomento("");
    handleClose();
  };

  const handleClose = () => {
    setOpenEditForm(false);
    setKomento("");
  };

  if (window.screen.width <= 1149) {
    return (
      <div className="HomeTeacher">
        <div className="container">
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "#b3dec1",
              // bgcolor: "background.paper",
              padding: 3,
              width: "100%",
              // display: "flex",
              minHeight: 380,
              borderRadius: 8,
            }}
          >
            <div className="error-icon">
              <ErrorIcon sx={{ fontSize: 50 }}></ErrorIcon>
            </div>
            <h2>
              Palihog pagopen gamit ang desktop or laptop para makita ang data
            </h2>
          </Box>
        </div>
      </div>
    );
  }

  return (
    <div className="HomeTeacher">
      <div className="container">
        <div className="student-list">
          {/* <div className="tabs">
            <div className="tab-buttons">
              {myStudents &&
                students.map((student) => (
                  <button
                    key={student.userId}
                    className={`tab-button ${
                      activeTab === student.userId && "active"
                    }`}
                    onClick={() => setActiveTab(student.userId)}
                  >
                    {student.firstName} {student.lastName}
                  </button>
                ))}
            </div>
            <div className="tab-content">
              {myStudents &&
                students.map((student) => (
                  <div
                    key={student.userId}
                    className={`tab-panel ${
                      activeTab === student.userId && "active"
                    }`}
                  >
                    {student.firstName}
                  </div>
                ))}
            </div>
          </div> */}

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "#b3dec1",
              // bgcolor: "background.paper",
              width: "100%",
              display: "flex",
              minHeight: 380,
            }}
          >
            {students.length === 0 && (
              <div style={{ margin: "2rem" }}>
                <h2>Wala estudyante na maipakita...</h2>
              </div>
            )}
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              {students.map((item, index) => (
                <Tab
                  label={`${item.firstName} ${item.lastName}`}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
            {students.map((item, studentIndex) => (
              <TabPanel
                sx={{ overflow: "scroll" }}
                variant="scrollable"
                value={value}
                index={studentIndex}
              >
                <div className="tabpanel-content">
                  <section>
                    <div className="section-header">
                      Mga nagligad nga puntos
                    </div>
                    <div className="section-content table">
                      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                Topiko sang Pagtakus
                              </TableCell>
                              <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="left"
                              >
                                Iskor
                              </TableCell>
                              <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="left"
                              >
                                Petsa
                              </TableCell>
                              <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="left"
                              >
                                Dugang nga buluhaton/Komento
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <Dialog open={openEditForm} onClose={handleClose}>
                              <DialogTitle>
                                Dugang nga buluhaton/Komento
                              </DialogTitle>
                              <DialogContent sx={{ width: 500 }}>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Komento"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  value={komento}
                                  onChange={(e) => setKomento(e.target.value)}
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>ikansel</Button>
                                <Button onClick={handleKomentoSubmit}>
                                  isave
                                </Button>
                              </DialogActions>
                            </Dialog>
                            {item.quizHistory.map((row, quizIndex) => (
                              <TableRow
                                key={row.timestamp}
                                // sx={{
                                //   "&:last-child td, &:last-child th": {
                                //     border: 0,
                                //   },
                                // }}
                              >
                                <TableCell>
                                  {_.capitalize(row.quizType)} ({row.category})
                                </TableCell>
                                <TableCell align="middle">
                                  {row.score}
                                  {row.quizType === "numero" ? "/10" : "/5"}
                                </TableCell>
                                <TableCell align="left">
                                  {row.timestamp}
                                </TableCell>
                                <TableCell
                                  // sx={{ display: "flex" }}
                                  align="left"
                                >
                                  <div style={{ display: "flex" }}>
                                    {row.dugangKomento}
                                    <BorderColorIcon
                                      onClick={() =>
                                        handleClickOpen(studentIndex, quizIndex)
                                      }
                                      sx={{
                                        marginLeft: "auto",
                                        fontSize: 17,
                                        cursor: "pointer",
                                      }}
                                    ></BorderColorIcon>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </section>
                  <section>
                    <div className="section-header">
                      Detalye sang estudyante
                    </div>
                    <div className="section-content">
                      <Paper elevation={2} sx={{ padding: 1 }}>
                        <div className="detail">
                          <p>
                            Name: {item.firstName} {item.lastName}
                          </p>
                          <p>Grado: {_.capitalize(item.grado)}</p>
                          <p>Date enrolled: {item.dateEnrolled}</p>
                        </div>
                      </Paper>
                    </div>
                  </section>
                </div>
              </TabPanel>
            ))}
          </Box>

          {/* <div className="student-table">
            <div className="row header">
              <div>Pangalan</div>
              <div>Numero</div>
              <div>Letra</div>
              <div>Tinaga</div>
            </div>
            {studentScores.map((item, index) => (
              <div className="row" key={index}>
                <div>{item.name}</div>
                <div>{item.score.numero}/100</div>
                <div>{item.score.letra}/20</div>
                <div>{item.score.tinaga}/40</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomeTeacher;
