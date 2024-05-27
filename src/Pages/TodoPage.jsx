import InputComponent from "../Components/InputComponent";
import TableComponent from "../Components/TableComponent";
import Header from "../Components/Header";
import { makeStyles } from "@mui/styles";
import { getAll } from "../api";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const classes = TodoStyle();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAll()
      .then((res) => setData(res.data))
      .catch((err) => setError(err));
    setIsLoading(false);
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  return (
    <>
      <div>
        <Header />
        <h1>React Fetching</h1>
        <div className={classes.root}>
          <InputComponent />
        </div>
        <div>
          <TableComponent data={data} onDelete={() => {}} />
        </div>
      </div>
    </>
  );
};

const TodoStyle = makeStyles({
  root: {
    background: "#ff000052",
    height: "150px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodoPage;
