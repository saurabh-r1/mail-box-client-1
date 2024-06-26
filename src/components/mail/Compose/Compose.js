import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Compose.css";
import axios from "axios";

const Compose = () => {
  const senderMail = localStorage.getItem("userEmail");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [messageSent, setMessageSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const messageContent = editorState.getCurrentContent().getPlainText();

    // Create email object
    const emailData = {
      sender: senderMail,
      receiver: email,
      subject: subject,
      message: messageContent,
      timestamp: Date.now(),
    };

    try {
      const receiverEmail = email.replace(/[@.]/g, "");
      const senderEmail = senderMail.replace(/[@.]/g, "");

      const url = "https://mailboxclient-dbc90-default-rtdb.firebaseio.com/";

      // Posting to Firebase
      await axios.post(`${url}/${receiverEmail}inbox.json`, emailData);

      await axios.post(`${url}/${senderEmail}sentbox.json`, emailData);

      // Clear form fields after successful submission
      setEmail("");
      setSubject("");
      setEditorState(EditorState.createEmpty());

      setMessageSent(true); // Set messageSent to true after successful submission

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="container">
      <div className="compose-box">
        <h1 className="compose-heading">New Message</h1>

        {messageSent && (
          <Alert
            variant="success"
            className="mt-3 text-center successAlert"
            style={{
              border: "none",
              background: "none",
              margin: "0",
              padding: "0",
            }}
          >
            Message sent successfully
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="To"
              required
            />
          </Form.Group>

          <Form.Group controlId="subject">
            <Form.Control
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Subject"
              required
            />
          </Form.Group>

          <Form.Group controlId="message">
            <div className="editor">
              <Editor
                placeholder="Enter your message"
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    "emoji",
                    "image",
                    "remove",
                    "history",
                  ],
                }}
              />
            </div>
          </Form.Group>

          <Button className="sendButton" variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Compose;
