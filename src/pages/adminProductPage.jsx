import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

    default:
      return state;
  }
};

function AdminProductPage() {
  const [{ loading, error, products, pages, loadingCreate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [selectedImage, setSelectedImage] = useState("");
  const [refreshProduct, setRefreshProduct] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  //  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };
    fetchData();
  }, [page, userInfo, refreshProduct]);

  const handleReset = () => {
    formRef.current.reset();
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

    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post("/api/products", formData, {
        "Content-Type": "multipart/form-data",
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      toast.success("product created successfully");
      dispatch({ type: "CREATE_SUCCESS" });
      // navigate(`/admin/product/${data.product._id}`);
      setRefreshProduct(true);
      handleReset();
    } catch (err) {
      toast.error(errorHandler(err));
      dispatch({
        type: "CREATE_FAIL",
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Modal
            name="create new product"
            placement="end"
            title="fill in the form below to create new product"
            Name={(e) => setName(e.target.value)}
            slug={(e) => setSlug(e.target.value)}
            price={(e) => setPrice(e.target.value)}
            count={(e) => setCount(e.target.value)}
            category={(e) => setCategory(e.target.value)}
            description={(e) => setDescription(e.target.value)}
            brand={(e) => setBrand(e.target.value)}
            submitHandler={submitHandler}
            inputValue={
              (name, slug, price, count, category, brand, description)
            }
            fileOnchange={(e) => setSelectedImage(e.target.files[0])}
            image={selectedImage}
            loadingCreate={loadingCreate}
            formRef={formRef}
          />
        </Col>
      </Row>

      {loading ? (
        <FetchingSpinner></FetchingSpinner>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
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
