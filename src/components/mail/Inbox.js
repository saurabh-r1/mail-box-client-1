// Inbox.js

import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import axios from "axios";

const Inbox = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(
        "https://mail-5f4a0-default-rtdb.firebaseio.com/emails.json"
      );
      const data = response.data;
      const emailList = [];

      for (const key in data) {
        emailList.push({
          id: key,
          ...data[key],
        });
      }

      setEmails(emailList.reverse()); // Reverse to display latest emails first
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleDeleteEmail = async (id) => {
    try {
      await axios.delete(
        `https://mail-5f4a0-default-rtdb.firebaseio.com/emails/${id}.json`
      );

      setEmails(emails.filter((email) => email.id !== id));
      console.log("Email deleted successfully");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Inbox</h2>
        <ListGroup>
          {emails.map((email) => (
            <ListGroup.Item key={email.id}>
              <div>
                <strong>From:</strong> {email.sender}
              </div>
              <div>
                <strong>Subject:</strong> {email.subject}
              </div>
              <div>
                <strong>Message:</strong> {email.message}
              </div>
              <div>
                <strong>Sent:</strong>{" "}
                {new Date(email.timestamp).toLocaleString()}
              </div>
              <Button
                variant="danger"
                onClick={() => handleDeleteEmail(email.id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Inbox;