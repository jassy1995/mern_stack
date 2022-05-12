import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/message-box";
import { Store } from "../store";
import { errorHandler } from "../script/error";
import FetchingSpinner from "../components/spinner";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Table";
import { toast } from "react-toastify";
import EditModal from "../components/user-edit-modal";
import http from "../lib/http";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      const newItem = action.payload;
      const existItem = state.users.find((item) => item._id === newItem._id);
      const userItems = existItem
        ? state.users.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.users, newItem];
      return {
        ...state,
        users: userItems,
        loadingUpdate: false,
      };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      let deletedUser = action.payload;
      let returningUser = state.users.filter(
        (user) => user._id !== deletedUser._id
      );
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
        users: returningUser,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};
function UserListPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedId, setSetSelectedId] = useState("");
  const [{ loading, error, users, loadingUpdate, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: "",
    });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await http.get(`/api/users`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: errorHandler(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      const { data } = await http.put(`/api/users/${selectedId}`, {
        name,
        email,
        isAdmin: checked,
      });
      dispatch({
        type: "UPDATE_SUCCESS",
        payload: data.user,
      });

      toast.success("User updated successfully");
    } catch (error) {
      toast.error(errorHandler(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  const handleUpdate = async (data) => {
    toggleShow();
    setName(data.name);
    setEmail(data.email);
    setChecked(data.isAdmin);
    setSetSelectedId(data._id);
  };

  const styleLoader = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "fixed",
    left: "0px",
    top: "80px",
    width: "100%",
    height: "70%",
  };

  const deleteHandler = async (user) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch({ type: "DELETE_REQUEST" });
      try {
        await http.delete(`/api/users/${user._id}`);
        dispatch({ type: "DELETE_SUCCESS", payload: user });
        toast.success("user deleted successfully");
      } catch (err) {
        toast.error(errorHandler(err));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };
  return (
    <Container>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <Row>
        <Col></Col>
        <Col>
          <EditModal
            changeIsAdmin={() => setChecked(!checked)}
            changeName={(e) => setName(e.target.value)}
            changeEmail={(e) => setEmail(e.target.value)}
            name={name}
            email={email}
            isAdmin={checked}
            btnText="update user info"
            placement="end"
            title="update user info here"
            submitBtnText="Update"
            show={show}
            handleClose={handleClose}
            toggleShow={toggleShow}
            submitHandler={submitHandler}
            loadingUpdate={loadingUpdate}
          />
        </Col>
      </Row>
      <h1>Users</h1>
      <div className="float-end">
        {loadingDelete && (
          <>
            <FetchingSpinner />
            <div className="text-danger"> Deleting...</div>
          </>
        )}
      </div>
      {loading ? (
        <div style={styleLoader} className="fs-3">
          <FetchingSpinner />
          <div className="pl-4 ml-4"> fetching...</div>
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : !loading && !error && users.length === 0 ? (
        <div style={styleLoader} className="fs-4">
          <div>
            <i className="bi bi-exclamation-circle fs-3"></i>
          </div>
          <div className="pl-4 ml-4">No Order</div>
        </div>
      ) : (
        <Table responsive="sm">
          <thead>
            <tr>
              <th>S/N</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td
                    className="text-success"
                    onClick={() => handleUpdate(user)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </td>
                  <td className="text-danger" style={{ cursor: "pointer" }}>
                    <i
                      onClick={() => deleteHandler(user)}
                      className="bi bi-trash2-fill"
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
export default UserListPage;
