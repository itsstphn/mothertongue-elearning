import {
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import _ from "lodash";
import React from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../hooks/useUserDataContext";
import "./MyScores.css";

const MyScores = () => {
  const { quizHistory, teacher } = useUserDataContext();
  const navigate = useNavigate();

  return (
    <div className="MyScores">
      <div className="back-container" onClick={() => navigate(-1)}>
        <TiArrowBackOutline
          size={35}
          className="back-arrow"
        ></TiArrowBackOutline>
      </div>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <strong>Teacher: {teacher && teacher}</strong>
      </Paper>{" "}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, backgroundColor: "#b3dec1" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", lineHeight: 1 }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Iskor
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Petsa
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }} align="left">
                Dugang nga buluhaton/Komento
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizHistory &&
              quizHistory.map((row) => (
                <TableRow
                  key={row.timestamp}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {_.capitalize(row.quizType)} ({row.category})
                  </TableCell>
                  <TableCell align="middle">
                    {row.score}
                    {row.quizType === "letra" ? "/5" : "/10"}
                  </TableCell>
                  <TableCell align="left">{row.timestamp}</TableCell>
                  <TableCell align="left">
                    <div style={{ display: "flex" }}>{row.dugangKomento}</div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyScores;
