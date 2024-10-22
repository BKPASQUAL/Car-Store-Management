<<<<<<< Tabnine <<<<<<<
import React from "react";//-
import { Modal, Divider } from "rsuite";//-
import { useNavigate } from "react-router-dom";//-
import Swal from "sweetalert2";//-
import "../../assets/css/LogoutModal.css";//-
/**//+
 * A modal component for logging out the user.//+
 *//+
 * @param {Object} props - The component's properties.//+
 * @param {boolean} props.open - Indicates whether the modal is open or not.//+
 * @param {function} props.handleClose - A function to handle closing the modal.//+
 * @param {string} props.headtxt - The text for the modal header.//+
 * @param {string} props.bodytxt - The text for the modal body.//+
 * @param {string} props.btntxt - The text for the modal buttons.//+
 * @returns {JSX.Element} - The LogoutModal component.//+
 *///+
function LogoutModal({ open, handleClose, headtxt, bodytxt, btntxt }) {
  const navigate = useNavigate();

  const handlerLogout = async () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose} className="modal-container">
      <Modal.Body className="modal-body">
        <div className="modal-header">
          <p className="modal-title">Logout</p>
          <div className="error-icon-container">
            <span className="material-symbols-outlined text-red">error</span>
          </div>
        </div>
        <Divider className="modal-divider" />
        <div className="modal-content">
          <p className="modal-text">Are you sure you want to logout?</p>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={handleClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handlerLogout} className="logout-button">
            Logout
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}//-
//-
export default LogoutModal;//-
}//+
>>>>>>> Tabnine >>>>>>>// {"conversationId":"6b3e16b9-dce4-4837-a0f0-2b155f9dc2c7","source":"instruct"}
