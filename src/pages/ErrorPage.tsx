import { useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import { Button } from "antd";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <Container className="h-screen flex flex-col items-center justify-center py-10">
        <div className="relative w-full mt-12">
          <h2 className="text-blue-700 text-8xl sm:text-9xl text-center mb-4">
            4 0 4
          </h2>
        </div>
        <Button onClick={() => navigate(-1)} type="primary" size="large">
          Back
        </Button>
      </Container>
    </section>
  );
};

export default ErrorPage;
