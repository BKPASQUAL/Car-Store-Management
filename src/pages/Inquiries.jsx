import React, { useState } from "react";
import "../assets/css/Inquiries.css";
import Navbar from "../components/common/Navbar";

const Inquiries = () => {
  const inquiries = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      contact: "123-456-7890",
      location: "New York, USA",
      message: "Looking for more details about your services.",
      preferredContactMethod: "Email",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      contact: "098-765-4321",
      location: "London, UK",
      message: "Interested in a partnership opportunity.",
      preferredContactMethod: "Phone",
    },
    {
        id: 3,
        name: "Jane Smith",
        email: "jane@example.com",
        contact: "098-765-4321",
        location: "London, UK",
        message: "Interested in a partnership opportunity.",
        preferredContactMethod: "Phone",
      },
      {
        id: 4,
        name: "Jane Smith",
        email: "jane@example.com",
        contact: "098-765-4321",
        location: "London, UK",
        message: "Interested in a partnership opportunity.",
        preferredContactMethod: "Phone",
      },
  ];

  const [respondedInquiries, setRespondedInquiries] = useState([]);

  const toggleRespond = (inquiryId) => {
    setRespondedInquiries((prev) =>
      prev.includes(inquiryId)
        ? prev.filter((id) => id !== inquiryId)
        : [...prev, inquiryId]
    );
  };

  return (
    <>
      <Navbar title="Inquiries" icon="mail" />
      <div className="inquiries-container">
        {inquiries.map((inquiry) => {
          const isResponded = respondedInquiries.includes(inquiry.id);

          return (
            <div
              key={inquiry.id}
              className={`inquiry-card ${isResponded ? "responded" : ""}`}
            >
              <div className="inquiry-header">
                <h3>{inquiry.name}</h3>
                <button
                  className={`respond-btn ${
                    isResponded ? "responded-btn" : ""
                  }`}
                  onClick={() => toggleRespond(inquiry.id)}
                >
                  {isResponded ? "Responded" : "Mark as Responded"}
                </button>
              </div>

              <div className="inquiry-body">
                <div className="inquiry-highlight">
                  <p>{inquiry.message}</p>
                </div>

                <div className="inquiry-info-con">
                  <div className="inquiry-info">
                    <span class="material-symbols-outlined">mail</span>
                    {inquiry.email}
                  </div>
                  <div className="inquiry-info">
                    <span class="material-symbols-outlined">call</span>
                    {inquiry.contact}
                  </div>
                  <div className="inquiry-info">
                    <span class="material-symbols-outlined">location_on</span>
                    {inquiry.location}
                  </div>
                  <div className="inquiry-info">
                    <span class="material-symbols-outlined">
                      connect_without_contact
                    </span>
                    {inquiry.preferredContactMethod}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Inquiries;
