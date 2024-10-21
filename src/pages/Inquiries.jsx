import React, { useState } from "react";
import "../assets/css/Inquiries.css";
import Navbar from "../components/common/Navbar";
import { useGetAllinquiriesQuery, useMarkAsResponseMutation } from "../store/api/inquiries";

const Inquiries = () => {
  const { data: inquiriesData, refetch } = useGetAllinquiriesQuery();
  const [markAsResponse] = useMarkAsResponseMutation();

  const toggleRespond = async (inquiryId) => {
    try {
      // Call the mutation to mark as responded
      await markAsResponse({ id: inquiryId }).unwrap();
      
      // Optionally, refetch the inquiries to get updated data
      refetch();
    } catch (error) {
      console.error("Failed to mark inquiry as responded:", error);
      // You can also show a notification to the user here if needed
    }
  };

  return (
    <>
      <Navbar
        title="Inquiries"
        icon="mail"
        count={inquiriesData?.payload ? inquiriesData.payload.length : "00"}
      />
      <div className="inquiries-container">
        {inquiriesData?.payload?.map((inquiry) => {
          return (
            <div
              key={inquiry.id}
              className={`inquiry-card ${inquiry.responsed ? "responded" : ""}`}
            >
              <div className="inquiry-header">
                <h3>{inquiry.name}</h3>
                <button
                  className={`respond-btn ${inquiry.responsed ? "responded-btn" : ""}`}
                  onClick={() => toggleRespond(inquiry.id)}
                  disabled={inquiry.responsed} // Disable button if already responded
                >
                  {inquiry.responsed ? "Responded" : "Mark as Responded"}
                </button>
              </div>

              <div className="inquiry-body">
                <div className="inquiry-highlight">
                  <p>{inquiry.massage}</p>
                </div>

                <div className="inquiry-info-con">
                  <div className="inquiry-info">
                    <span className="material-symbols-outlined">mail</span>
                    {inquiry.email}
                  </div>
                  <div className="inquiry-info">
                    <span className="material-symbols-outlined">call</span>
                    {inquiry.contactNo}
                  </div>
                  <div className="inquiry-info">
                    <span className="material-symbols-outlined">location_on</span>
                    {inquiry.location}
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
