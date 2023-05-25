export default function DateList({ tasks }) {
 /* const handleTaskChange = (i) => () => {
    onTaskChange(i);
  }; */

  return (
    <>
      <h2>Date Streak list</h2>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{task.task}</td>
              
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
