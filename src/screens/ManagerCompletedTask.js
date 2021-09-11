import { Link } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import { ServerPath } from "../config/ServerPath";
import ModalBox from "../components/ModalBox";
import { useEffect, useState } from "react";

export default function ManagerCompletedTask({ match }) {
  const [compTask, setcompTask] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [taskId, settaskId] = useState("");

  useEffect(() => {
    fetch(ServerPath.Manager, {
      method: "POST",
      body: JSON.stringify({
        type: "completed_task",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setcompTask(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = (data, taskId) => {
    setModalData(data);
    settaskId(taskId);
    setShow(true);
  };
  return (
    <>
      <div className="container">
        <h3 className="title-clr">Manager Dashboard</h3>
        <Link to="/">Logout</Link>
        <hr />
        <div className="jumbotron">
          <Link to="/Manager">Add Task</Link> &nbsp;&nbsp;
          <Link to="//ManagerCompTask">Completed Task</Link>
          <div class="table-responsive mt-5 table-primary">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Task Id</th>
                  <th scope="col">Task Name</th>
                  <th scope="col">Assigned To</th>
                  <th scope="col">Status</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {compTask.map((task, index) => {
                  return (
                    <tr>
                      <td>{task.prj_id}</td>
                      <td>{task.prj_name}</td>
                      <td>{task.task_id}</td>
                      <td>{task.task_name}</td>
                      <td>{task.assigned_to}</td>
                      <td>{task.status}</td>
                      <td>
                        <SubmitButton
                          value="Change"
                          onClick={() =>
                            handleShow("Manager_comptask", task.task_id)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ModalBox
            handleClose={() => handleClose()}
            show={show}
            modalData={modalData}
            taskId={taskId}
          />
        </div>
      </div>
    </>
  );
}
