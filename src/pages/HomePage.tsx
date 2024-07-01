import Table from "../components/TableComponent";
import Container from "../components/common/Container";
import PageTitle from "../components/common/PageTitle";

const HomePage = () => {
  return (
    <>
      <PageTitle title="Home" />
      <section>
        <Container>
          <Table />
        </Container>
      </section>
    </>
  );
};

export default HomePage;
