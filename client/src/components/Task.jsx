import axios from "axios";
import cookie from "js-cookie";

export default function Task(props) {
  const { _id, task } = props.props;

  function deleteItem() {
    axios
      .post("/api/deleteTask", { taskId: _id, token: cookie.get("token") })
      .then(() => window.location.reload());
  }

  return (
    <div key={_id}>
      <input type="checkbox" onChange={deleteItem}/> {task}
      <button onClick={deleteItem}>Delete</button>
    </div>
  );
}
