import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EmailDetail.css";

const EmailDetail = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [emailType, setEmailType] = useState(""); // To determine if email is from inbox or sentbox

  const senderEmail = localStorage.getItem("userEmail").replace(/[@.]/g, "");

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        // First try to fetch email from sentbox
        let response = await axios.get(
          `https://mail-5f4a0-default-rtdb.firebaseio.com/${senderEmail}sentbox/${id}.json`
        );

        if (response.data) {
          setEmail(response.data);
          setEmailType("sent");
          return; // If email found in sentbox, no need to check inbox
        }

        // If email not found in sentbox, fetch from inbox
        response = await axios.get(
          `https://mail-5f4a0-default-rtdb.firebaseio.com/${senderEmail}inbox/${id}.json`
        );

        if (response.data) {
          setEmail(response.data);
          setEmailType("inbox");
          return;
        }

        // If email not found in both sentbox and inbox
        setEmail(null);
      } catch (error) {
        console.error("Error fetching email details:", error);
      }
    };

    fetchEmail();
  }, [id]);

  if (!email) {
    return <div className="email-detail-loading">Loading...</div>; 
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
        <div className="email-detail-row">
          <strong className="email-detail-label">Email Type:</strong>{" "}
          <span className="email-detail-text">{emailType}</span>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
