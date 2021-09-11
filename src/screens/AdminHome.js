import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";
import { ServerPath } from "../config/ServerPath";
import { useEffect, useState } from "react";
import ModalBox from "../components/ModalBox";

export default function AdminHome() {
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    fetch(ServerPath.Admin, {
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
  const handleShow = (data) => {
    setModalData(data);
    setShow(true);
  };

  return (
    <>
      <div className="container">
        <h3 className="title-clr">Admin Dashboard</h3>
        <Link to="/">Logout</Link>
        <hr />
        <div className="jumbotron">
          <SubmitButton value="+" onClick={() => handleShow("Admin")} />
          <span className="sub-text">Add New </span>
          <div class="table-responsive mt-5 table-primary">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                </tr>
              </thead>
              <tbody>
                {project.map((pro, index) => {
                  return (
                    <tr>
                      <td>{pro.prj_id}</td>
                      <td>{pro.prj_name}</td>
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
          />
        </div>
      </div>
    </>
  );
}
