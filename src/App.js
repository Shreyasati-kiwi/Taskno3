import React from "react";
import { FaSortUp } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [studData, setStudData] = React.useState([]);
  const [ascending,setAscending]= React.useState(true)
  const [presentPageData, setPresentPageData] = React.useState([]);
  const [presentPageVal, setPresentPageVal] = React.useState(1);
  const [filteredData, setFilteredData] = React.useState([]);

  const getData = async () => {
    let dat = await fetch(
      "https://63e0bacd59bb472a74278f0f.mockapi.io/api/v1/students"
    );
    dat = await dat.json();
    setStudData(dat);
    setFilteredData(dat);
    setPresentPageData(dat.slice(0, 5));
  };

  const sortData = () => {
    let sortedDat = filteredData.sort((a, b) => ascending ? a.class - b.class : b.class-a.class);
    setFilteredData(sortedDat);
    setPresentPageData(
      sortedDat.slice(presentPageVal * 5 - 5, presentPageVal * 5)

    );
    setAscending(!ascending)
  };
  

  const filterData = (e) => {
    const option = e.target.value;
    if (option === "All") {
      setFilteredData(studData);
      setPresentPageVal(1);
      setPresentPageData(studData.slice(0, 5));
    } else {
      let filtDat = studData.filter((d) => d.class === option);
      setFilteredData(filtDat);
      setPresentPageVal(1);
      setPresentPageData(filtDat.slice(0, 5));
    }
  };

  const onPageChange = (pageVal) => {
    setPresentPageVal(pageVal);
    setPresentPageData(filteredData.slice(pageVal * 5 - 5, pageVal * 5));
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="val-table">
      <h2>Student Data</h2>
      <div>
        <label htmlFor="class">Filter by class:</label>

        <select name="class" id="cars" onChange={filterData}>
          <option value="All">All</option>
          {[...Array(9)].map((val, ind) => (
            <option key={ind} value={ind + 1}>
              {ind + 1}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>
              Class
              <button title="click for sorting"onClick={sortData}> <FaSortUp/> </button>
             
            </th>
            <th>Marks</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {presentPageData &&
            presentPageData.map((data, i) => (
              <tr key={i}>
                <td>
                  <img src={data.avatar} alt="avatar" className="avatar" />
                </td>
                <td>{data.name}</td>
                <td>{data.class}</td>
                <td>{data.marks}</td>
                <td>{data.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {[...Array(Math.ceil(filteredData.length / 5))].map((val, ind) => (
          <button
            className={`pagination-button ${
              ind + 1 === presentPageVal ? "selected" : ""
            }`}
            key={ind}
            onClick={() => onPageChange(ind + 1)}
          >
            {ind + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
