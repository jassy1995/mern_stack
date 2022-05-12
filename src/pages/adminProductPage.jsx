import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Store } from "../store";
import FetchingSpinner from "../components/spinner";
import MessageBox from "../components/message-box";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Modal from "../components/modal";
import { toast } from "react-toastify";
import { errorHandler } from "../script/error";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};

function AdminProductPage() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingUpdate,
      loadingDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    loadingDelete: false,
    error: "",
  });

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

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [selectedImage, setSelectedImage] = useState("");
  const [refreshProduct, setRefreshProduct] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedId, setSetSelectedId] = useState("");

  const formRef = useRef(null);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        toast.error(errorHandler(err));
      }
    };
    fetchData();
  }, [page, userInfo, refreshProduct]);

  const handleReset = () => {
    formRef.current.reset();
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch({ type: "DELETE_REQUEST" });
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "DELETE_SUCCESS" });
        toast.success("product deleted successfully");
        setRefreshProduct("product deleted successfully");
      } catch (err) {
        toast.error(errorHandler(err));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("count", count);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("image", selectedImage);
    if (!isUpdating) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        await axios.post("/api/products", formData, {
          "Content-Type": "multipart/form-data",
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "CREATE_SUCCESS" });
        setRefreshProduct("new product created successfully");
        toast.success("product created successfully");
        handleReset();
        // navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(errorHandler(err));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    } else {
      try {
        dispatch({ type: "UPDATE_REQUEST" });
        await axios.put(`/api/products/${selectedId}`, formData, {
          "Content-Type": "multipart/form-data",
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        toast.success("product updated successfully");
        dispatch({ type: "UPDATE_SUCCESS" });
        setRefreshProduct("product updated successfully");
      } catch (err) {
        toast.error(errorHandler(err));
        dispatch({
          type: "UPDATE_FAIL",
        });
      }
    }
  };

  const handleUpdate = async (data) => {
    setName(data.name);
    setSlug(data.slug);
    setPrice(data.price);
    setSelectedImage(data.image);
    setCategory(data.category);
    setCount(data.count);
    setBrand(data.brand);
    setDescription(data.description);
    setSetSelectedId(data._id);
    setIsUpdating(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          {loadingDelete && (
            <>
              <FetchingSpinner />
              <div className="text-danger"> Deleting...</div>
            </>
          )}
        </Col>

        <Col className="text-end">
          <Modal
            btnText="create new product"
            placement="end"
            title="fill in the form below to create new product"
            changeName={(e) => setName(e.target.value)}
            changeSlug={(e) => setSlug(e.target.value)}
            changePrice={(e) => setPrice(e.target.value)}
            changeCount={(e) => setCount(e.target.value)}
            changeCategory={(e) => setCategory(e.target.value)}
            changeDescription={(e) => setDescription(e.target.value)}
            changeBrand={(e) => setBrand(e.target.value)}
            submitHandler={submitHandler}
            name={name}
            slug={slug}
            price={price}
            count={count}
            category={category}
            brand={brand}
            description={description}
            fileOnchange={(e) => setSelectedImage(e.target.files[0])}
            selectedImage={selectedImage}
            loadingCreate={loadingCreate}
            formRef={formRef}
            handleClose={handleClose}
            toggleShow={toggleShow}
            show={show}
            loadingUpdate={loadingUpdate}
            submitBtnText={isUpdating ? "Update" : "Create"}
          />
        </Col>
      </Row>

      {loading ? (
        <div style={styleLoader} className="fs-3">
          <FetchingSpinner />
          <div className="pl-4 ml-4"> fetching...</div>
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : !loading && products.length === 0 ? (
        <div style={styleLoader} className="fs-4">
          <div>
            <i className="bi bi-exclamation-circle fs-3"></i>
          </div>
          <div className="pl-4 ml-4">No Product</div>
        </div>
      ) : (
        <>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>S/N</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product._id}>
                  <td>{i + 1}</td>
                  <td>{product.name?.split("/")[0]}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td
                    className="text-success"
                    onClick={() => handleUpdate(product)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </td>
                  <td className="text-danger" style={{ cursor: "pointer" }}>
                    <i
                      onClick={() => deleteHandler(product)}
                      className="bi bi-trash2-fill"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={
                  x + 1 === Number(page)
                    ? "btn btn-sm text-bold btn-color1"
                    : "btn btn-sm btn-color2"
                }
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

export default AdminProductPage;
