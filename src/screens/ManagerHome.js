import { Link } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import { ServerPath } from "../config/ServerPath";
import ModalBox from "../components/ModalBox";
import { useEffect, useState } from "react";

export default function ManagerHome({ match }) {
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [prjData, setprjData] = useState({
    prjId: "",
    prjName: "",
  });

  useEffect(() => {
    fetch(ServerPath.Manager, {
      method: "POST",
      body: JSON.stringify({
        type: "fetch_project",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setProject(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = (data, prjId, prjName) => {
    setModalData(data);
    setprjData({ prjId: prjId, prjName: prjName });
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
          <Link to="/ManagerCompTask">Completed Task</Link>
          <div class="table-responsive mt-5 table-primary">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                  <th>Add</th>
                </tr>
              </thead>
              <tbody>
                {project.map((pro, index) => {
                  return (
                    <tr>
                      <td>{pro.prj_id}</td>
                      <td>{pro.prj_name}</td>
                      <td>
                        <SubmitButton
                          value="Add Task"
                          onClick={() =>
                            handleShow("Manager", pro.prj_id, pro.prj_name)
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
            prjData={prjData}
          />
        </div>
      </div>
    </>
  );
}
