import { Link } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import { ServerPath } from "../config/ServerPath";
import ModalBox from "../components/ModalBox";
import { useEffect, useState } from "react";

export default function DeveloperHome({ match }) {
  const [myTask, setmyTask] = useState([]);
  const [devData, setdevData] = useState({
    myId: "",
    taskId: "",
  });
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    setdevData({ ...devData, myId: match.params.id });
    fetch(ServerPath.Developer, {
      method: "POST",
      body: JSON.stringify({
        type: "fetch_task",
        devId: match.params.id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setmyTask(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = (data, taskId) => {
    setModalData(data);
    setdevData({ ...devData, taskId: taskId });
    setShow(true);
  };
  const badgeColor = (status) => {
    if (status == "Complete") return "badge bg-primary";
    else if (status == "New") return "badge bg-secondary";
    else if (status == "Incomplete") return "badge bg-danger";
    else if (status == "Finished") return "badge bg-success";
    else if (status == "Start") return "badge bg-info";
    else if (status == "End") return "badge bg-warning";
  };
  return (
    <>
      <div className="container">
        <h3 className="title-clr">Developer Dashboard</h3>
        <Link to="/">Logout</Link>
        <hr />
        <div className="jumbotron">
          <div class="table-responsive mt-5 table-primary">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task Id</th>
                  <th scope="col">Task Name</th>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {myTask.map((task, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{task.task_id}</td>
                    <td>{task.task_name}</td>
                    <td>{task.prj_id}</td>
                    <td>{task.prj_name}</td>
                    <td>
                      <span className={badgeColor(task.status)}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <SubmitButton
                        value="update"
                        onClick={() => handleShow("Developer", task.task_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ModalBox
            handleClose={() => handleClose()}
            show={show}
            modalData={modalData}
            devData={devData}
          />
        </div>
      </div>
    </>
  );
}
