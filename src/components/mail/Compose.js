// Compose.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Compose.css";
import axios from "axios";

const Compose = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
      sender: "sender@ifno.com", 
      receiver: email,
      subject: subject,
      message: messageContent,
      timestamp: Date.now()
    };

    try {
      // Send email to Firebase
      await axios.post("https://mail-5f4a0-default-rtdb.firebaseio.com/emails.json", emailData);

      // Clear form fields after successful submission
      setEmail("");
      setSubject("");
      setEditorState(EditorState.createEmpty());

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group controlId="subject">
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Enter subject"
              required
            />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message:</Form.Label>
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
