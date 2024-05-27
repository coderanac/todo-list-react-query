import InputComponent from "../Components/InputComponent";
import TableComponent from "../Components/TableComponent";
import Header from "../Components/Header";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { getAll, createTodo, deleteTodo } from "../api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const TodoPage = () => {
  const classes = TodoStyle();

  const client = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery("fetchTodo", getAll, {
    staleTime: 15000,
    select: (response) => response.data,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation(createTodo, {
    onSuccess: () => client.invalidateQueries("fetchTodo"),
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => client.invalidateQueries("fetchTodo"),
  });

  const saveNewTodo = (todo) => {
    createMutation.mutate(todo);
  };

  const deleteATodo = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      <Header />
      <h1>React Query Fetching</h1>
      <div className={classes.root}>
        <InputComponent onSave={saveNewTodo} />
      </div>
      <Button onClick={refetch}>Get todos</Button>
      <div>
        <TableComponent data={data} onDelete={deleteATodo} />
      </div>
    </div>
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
