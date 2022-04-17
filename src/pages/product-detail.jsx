import { useParams } from "react-router-dom";
function ProductDetailPage() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>detail here</h1>
    </div>
  );
}

export default ProductDetailPage;
