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
    <div key={_id} className="task-holder">
      <div className="checkbox-holder">
        <input type="checkbox" className="checkbox" onChange={deleteItem} />
      </div>
      <div className="task-item-holder">{task}</div>
      <div className="button-holder">
        <button onClick={deleteItem} className="form-btn">Delete</button>
      </div>
    </div>
  );
}
