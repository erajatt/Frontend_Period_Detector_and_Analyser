import React, { useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({token}) => {
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [predictedData, setPredictedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(start_date)
        console.log(end_date)
        console.log(symptoms)

      const response = await axios.post("http://127.0.0.1:8000/api/createPeriodDetail", {
        start_date:start_date,
        end_date:end_date,
        symptoms:symptoms,
      });
      console.log(response);
        setShowDetails(true);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePredict = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/predictNextPeriod");
        setPredictedData(response.data);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Enter your period details</h2>
        <div className={styles.inputGroup}>
          <label>Start Date:</label>
          <input
            type="date"
            value={start_date}
            onChange={(e) => setstart_date(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>End Date:</label>
          <input
            type="date"
            value={end_date}
            onChange={(e) => setend_date(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Symptoms:</label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Details</button>
      </form>
      {showDetails && (
        <div className={styles.details}>
          <button onClick={handlePredict}>
            Predict your Next Period / Calculate Average Cycle Length
          </button>
        </div>
      )}
      {predictedData && (
        <div className={styles.predictedData}>
          <h3>Predicted Start Date: {predictedData.predicted_start_date}</h3>
          <h3>Predicted End Date: {predictedData.predicted_end_date}</h3>
          <h3>Average Cycle Length: {predictedData.average_cycle_length}</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
