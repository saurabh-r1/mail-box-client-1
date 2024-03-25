import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EmailDetail.css"; // Import CSS file for styling

const EmailDetail = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          `https://mail-5f4a0-default-rtdb.firebaseio.com/emails/${id}.json`
        );
        setEmail(response.data);
      } catch (error) {
        console.error("Error fetching email details:", error);
      }
    };

    fetchEmail();
  }, [id]);

  if (!email) {
    return <div className="email-detail-loading">Loading...</div>; // Apply loading class
  }

  return (
    <div className="email-detail-container">
      <div className="email-detail-header">
        <h2 className="email-detail-title">Email Details</h2>
      </div>
      <div className="email-detail-content">
        <div className="email-detail-row">
          <strong className="email-detail-label">Sender:</strong>{" "}
          <span className="email-detail-text">{email.sender}</span>
        </div>
        <div className="email-detail-row">
          <strong className="email-detail-label">Subject:</strong>{" "}
          <span className="email-detail-text">{email.subject}</span>
        </div>
        <div className="email-detail-row">
          <strong className="email-detail-label">Message:</strong>{" "}
          <span className="email-detail-text">{email.message}</span>
        </div>
        <div className="email-detail-row">
          <strong className="email-detail-label">Received At:</strong>{" "}
          <span className="email-detail-text">
            {new Date(email.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
