import React, { useState, useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";
import "./Inbox.css";
import { Link } from "react-router-dom"

const SentMails = () => {
  const [emails, setEmails] = useState([]);

  const senderEmail = localStorage.getItem("userEmail").replace(/[@.]/g, "");

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(
        `https://mail-5f4a0-default-rtdb.firebaseio.com/${senderEmail}sentbox.json`
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
        `https://mail-5f4a0-default-rtdb.firebaseio.com/${senderEmail}sentbox/${id}.json`
      );

      setEmails(emails.filter((email) => email.id !== id));
      console.log("Email deleted successfully");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <div className="inboxContainer">
      <h2 className="inboxTitle">Sent Mail</h2>
      <Card className="inboxCard">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Sent to</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Sent At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
  {emails.map((email) => (
    <tr key={email.id} className="email-row">
      <td><Link to={`/email/${email.id}`} className="email-link">{email.sender}</Link></td>
      <td><Link to={`/email/${email.id}`} className="email-link">{email.subject}</Link></td>
      <td><Link to={`/email/${email.id}`} className="email-link">{email.message}</Link></td>
      <td><Link to={`/email/${email.id}`} className="email-link">{new Date(email.timestamp).toLocaleString()}</Link></td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDeleteEmail(email.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ))}
</tbody>
        </Table>
      </Card>
    </div>
  );
};

export default SentMails;
