import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { ServerPath } from "../config/ServerPath";
import RadioButton from "./RadioButton";

export default function ModalBox(props) {
  const { modalData, show, handleClose, devData, prjData, taskId } = props;
  const [projectName, setProjectName] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [taskName, setTaskName] = useState("");
  const [assignedto, setAssignedto] = useState("");
  const formData = (data) => {
    if (data == "Admin") {
      if (projectName != "") {
        fetch(ServerPath.Admin, {
          method: "POST",
          body: JSON.stringify({
            type: "create_project",
            prjname: projectName,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Empty value Found");
      }
    } else if (data == "Developer") {
      fetch(ServerPath.Developer, {
        method: "POST",
        body: JSON.stringify({
          type: "update_task",
          PrjStatus: projectStatus,
          // DevId: devData.myId,
          TaskId: devData.taskId,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (data == "Manager") {
      if (taskName !== "" && assignedto !== "") {
        fetch(ServerPath.Manager, {
          method: "POST",
          body: JSON.stringify({
            type: "create_task",
            prjId: prjData.prjId,
            prjName: prjData.prjName,
            taskName: taskName,
            assignedto: assignedto,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            alert(`Successfully Task Created to DeveloperId - ${assignedto} `);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Empty value found");
      }
    } else if (data == "Manager_comptask") {
      fetch(ServerPath.Developer, {
        method: "POST",
        body: JSON.stringify({
          type: "update_task",
          PrjStatus: projectStatus,
          // DevId: devData.myId,
          TaskId: taskId,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        {modalData == "Admin" && <Modal.Title>Create Project</Modal.Title>}
        {modalData == "Developer" && <Modal.Title>Status Update</Modal.Title>}
        {modalData == "Manager" && <Modal.Title>Create Task</Modal.Title>}
        {modalData == "Manager_comptask" && (
          <Modal.Title>Status Update</Modal.Title>
        )}
      </Modal.Header>

      <Modal.Body>
        {modalData == "Admin" && (
          <form>
            <InputField
              label="ProjectName"
              name="prj_name"
              onChange={(e) => setProjectName(e.target.value)}
            />
          </form>
        )}
        {modalData == "Developer" && (
          <form>
            <RadioButton
              name="status"
              label="Start"
              onChange={(e) => setProjectStatus(e.target.value)}
            />
            <RadioButton
              name="status"
              label="End"
              onChange={(e) => setProjectStatus(e.target.value)}
            />
            <RadioButton
              name="status"
              label="Complete"
              onChange={(e) => setProjectStatus(e.target.value)}
            />
          </form>
        )}
        {modalData == "Manager" && (
          <form>
            <InputField
              label="Task Name"
              name="task_name"
              onChange={(e) => setTaskName(e.target.value)}
            />
            <InputField
              label="Assigned To"
              name="assigned_to"
              onChange={(e) => setAssignedto(e.target.value)}
            />
          </form>
        )}
        {modalData == "Manager_comptask" && (
          <form>
            <RadioButton
              name="status"
              label="Finished"
              onChange={(e) => setProjectStatus(e.target.value)}
            />
            <RadioButton
              name="status"
              label="Incomplete"
              onChange={(e) => setProjectStatus(e.target.value)}
            />
          </form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => formData(modalData)}>
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
