import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [device, setDevice] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    navigate("/");
  };
  const onlineDevice = () => {
    axios
      .get("http://35.201.2.209:8000/devices")
      .then((response) => {
        setDevice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const notify = () => {
    let Parameters = {
      name: "Mohammad Abu Taleb",
      email: "abutaleb142@gmail.com",
      repoUrl: "https://github.com/abutaleb00/frontend-candidate-code-test",
      message:
        "Hello Dear, I'm finished my frontend code test works.So you can review my code and provide me your great feedback.",
    };
    axios
      .post("http://35.201.2.209:8000/notify", Parameters, { headers: headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    onlineDevice();
    const interval = setInterval(() => {
      onlineDevice();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ background: "#FF7043", height: "100%" }}
    >
      <div className="h-100 row align-items-center">
        <div className="circle-container">
          <a href="#" className="center">
            <p>
              <span style={{ fontSize: "26px" }}>
                {device?.devices?.length}
              </span>
              <br /> DEVICES <br />
              ONLINE
            </p>
          </a>
          {device?.devices?.map((e, i) => {
            return (
              <a href="#" key={e.id} className={`deg${e.id}`}>
                <p></p>
              </a>
            );
          })}
        </div>
      </div>
      <footer className="fixed-bottom" style={{ background: "#D76845" }}>
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <button
            onClick={notify}
            className="btn btn-light"
            style={{ marginRight: "15px" }}
          >
            NOTIFY
          </button>
          <button onClick={logout} className="btn btn-dark m-l-2">
            LOGOUT
          </button>
        </div>
      </footer>
    </div>
  );
};
