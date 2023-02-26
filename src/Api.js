import React, { useState, useEffect } from "react";

export default function Api(props) {
  let obj = { name: "", email: "", body: "", title: "", id: "" };
  const [isLoaded, setLoaded] = useState(true);
  const [content, setContent] = useState("");
  const [data, setData] = useState(obj);


  const handle=(e)=> {
    setData({ ...data, [e.target.name]: e.target.value });
  }


  const setDefaultForm = () => {
    setData(obj);
  };

  const setFormForUpdate = (id) => {
    setData(...content.filter((val) => val.id === id));
  };

  // ===================         GET        ====================

  useEffect(() => {
    get();
  }, []);

  async function get() {
    let response = await fetch(
      "https://63f58e6a2213ed989c566ce5.mockapi.io/rohit/name"
    );
    let data = await response.json();
    setContent(data);
    setLoaded(false);
  }

  // ===================         DELETE      ====================

  async function del(id) {
    let resp = await fetch(
      `https://63f58e6a2213ed989c566ce5.mockapi.io/rohit/name/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let data = await resp.json();
    console.log(data);
    get();
    setDefaultForm();
    // setLoaded(true);
  }

  // ===================         PUT / UPDATE       ====================

  async function put(e) {
    e.preventDefault();
    let response = await fetch(
      `https://63f58e6a2213ed989c566ce5.mockapi.io/rohit/name/${data.id}`,
      {
        method: "PUT",
        body: JSON.stringify(data) ,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    get();
    setDefaultForm();
    // setLoaded(true);
  }

  // ===================         POST       ====================

  async function post(e) {
    e.preventDefault();
    let response = await fetch(
      `https://63f58e6a2213ed989c566ce5.mockapi.io/rohit/name`,
      {
        method: "POST",
        body:  JSON.stringify(data),

        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    get();
    setDefaultForm();
    // setLoaded(true);
  }

  // ==================================================================

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-6  ">
            <form class="row g-3 mt-3">
              <div class="col-12 justify-content-center">
                <h1>CRUD</h1>
              </div>

              <div class="col-md-6">
                <label for="name" class="form-label">
                  name
                </label>
                <input
                  value={data.name}
                  onChange={(e) => {
                    handle(e);
                  }}
                  name="name"
                  type="name"
                  class="form-control"
                  id="name"
                />
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  value={data.email}
                  onChange={(e) => {
                    handle(e);
                  }}
                  name="email"
                  type="text"
                  class="form-control"
                  id="email"
                />
              </div>
              <div class="col-12">
                <label for="body" class="form-label">
                  Body
                </label>
                <input
                  value={data.body}
                  onChange={(e) => {
                    handle(e);
                  }}
                  name="body"
                  type="text"
                  class="form-control"
                  id="body"
                  placeholder=""
                />
              </div>

              <div class="col-md-12">
                <label for="title" class="form-label">
                  title
                </label>
                <input
                  value={data.title}
                  onChange={(e) => {
                    handle(e);
                  }}
                  name="title"
                  type="text"
                  class="form-control"
                  id="title"
                />
              </div>
              <div class="col-6">
                <button
                  onClick={(e) => post(e)}
                  type="submit"
                  class="btn btn-primary"
                >
                  POST
                </button>
              </div>
              <div class="col-6">
                <button
                  onClick={(e) => put(e)}
                  type="put"
                  class="btn btn-primary"
                >
                  PUT
                </button>
              </div>
            </form>
          </div>
          <div class="col-6">
            <div id="table">
              {isLoaded === true ? (
                <div>loading....</div>
              ) : (
                <table
                  class="table"
                  style={{ padding: "10px", borderWidth: "3px" }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Body</th>
                      <th>title</th>
                      <th>title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((val, idx) => {
                      return (
                        <tr key={val.id}>
                          <td>{val.id}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>{val.body}</td>
                          <td>{val.title}</td>

                          <td>
                            <div>
                              <button
                                class="btn btn-danger m-2"
                                id={idx + 1}
                                onClick={() => del(val.id)}
                              >
                                <h6>DELETE</h6>
                              </button>
                            </div>
                            <div>
                              <button
                                class="btn btn-success ms-1"
                                id={idx + 1}
                                onClick={() => setFormForUpdate(val.id)}
                              >
                                <h6>UPDATE</h6>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
