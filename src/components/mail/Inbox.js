import React, { useEffect, useState } from "react";
import { Button, Card, Table, Badge } from "react-bootstrap";
import axios from "axios";
import "./Inbox.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmailsSuccess,
  deleteEmailSuccess,
  markAsReadSuccess,
} from "./inboxSlice";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.inbox.emails);
  const unreadCount = useSelector((state) => state.inbox.unreadCount);
  const senderEmail = localStorage.getItem("userEmail").replace(/[@.]/g, "");

  // State to keep track of polling interval
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Fetch emails initially
    fetchEmails();

    // Start polling
    const id = setInterval(fetchEmails, 2000);
    setIntervalId(id);

    // Cleanup function to clear interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(
        `https://mail-5f4a0-default-rtdb.firebaseio.com/${senderEmail}inbox.json`
      );
      const data = response.data;
      const emailList = [];
      let unread = 0;

      for (const key in data) {
        emailList.push({
          id: key,
          ...data[key],
        });

        if (!data[key].read) {
          unread++;
        }
      }

      dispatch(
        fetchEmailsSuccess({ emails: emailList.reverse(), unreadCount: unread })
      );
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleDeleteEmail = async (id) => {
    try {
      await axios.delete(
        `https://mail-5f4a0-default-rtdb.firebaseio.com/${senderEmail}inbox/${id}.json`
      );

      dispatch(deleteEmailSuccess(id));
      console.log("Email deleted successfully");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `https://mail-5f4a0-default-rtdb.firebaseio.com/${senderEmail}inbox/${id}.json`,
        { read: true }
      );

      dispatch(markAsReadSuccess(id));
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  return (
    <div className="inboxContainer">
      <h2 className="inboxTitle">Inbox</h2>
      <div className="unread-count">
        Unread: <Badge variant="info">{unreadCount}</Badge>
      </div>
      <Card className="inboxCard">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Received At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id} className="email-row">
                <td>
                  <Link
                    to={`/email/${email.id}`}
                    className={email.read ? "email-link" : "email-link-bold"}
                    onClick={() => markAsRead(email.id)}
                  >
                    {email.sender}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/email/${email.id}`}
                    className={email.read ? "email-link" : "email-link-bold"}
                    onClick={() => markAsRead(email.id)}
                  >
                    {email.subject}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/email/${email.id}`}
                    className="email-link"
                    onClick={() => markAsRead(email.id)}
                  >
                    {email.message.substring(0, 50)}
                    {email.message.length > 50 && "..."}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/email/${email.id}`}
                    className="timestamp"
                    onClick={() => markAsRead(email.id)}
                  >
                    {new Date(email.timestamp).toLocaleString()}
                  </Link>
                </td>
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

export default Inbox;
