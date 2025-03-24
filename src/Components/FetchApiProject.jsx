import React, { useEffect, useState } from "react";

const FetchApiProject = () => {
  const [project, setProject] = useState([]);
  const [search, setSearch] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects")
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setSearch(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [projectName, department, status, sortBy]);

  const filterAndSortData = () => {
    let filteredData = project;

    if (projectName) {
      filteredData = filteredData.filter((p) => p.ProjectName.toLowerCase().includes(projectName.toLowerCase()));
    }

    if (department) {
      filteredData = filteredData.filter((p) => p.Department === department);
    }

    if (status) {
      filteredData = filteredData.filter((p) => p.status === status);
    }

    if (sortBy === "name") {
      filteredData = filteredData.sort((a, b) => a.ProjectName.localeCompare(b.ProjectName));
    } else if (sortBy === "date") {
      filteredData = filteredData.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    setSearch([...filteredData]);
  };

  return (
    <div className="container w-100">
      <h2>Project</h2>
      <input 
        type="text" 
        placeholder="Project Name" 
        value={projectName} 
        onChange={(e) => setProjectName(e.target.value)} 
        style={{  width:'100%', marginLeft:'22px', height:'35px' }}
      />
      
      <select className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} style={{ margin: "20px" }}>
        <option value="">All Departments</option>
        <option value="Research & Development">Research & Development</option>
        <option value="Marketing">Marketing</option>
        <option value="Operations">Operations</option>
        <option value="Innovation Lab">Innovation Lab</option>
        <option value="IT">IT</option>
        <option value="Business Strategy">Business Strategy</option>
        <option value="Sales">Sales</option>
        <option value="Digital Transformation">Digital Transformation</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="Integration">Integration</option>
        <option value="Artificial Intelligence">Artificial Intelligence</option>
      </select>

      <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} style={{ margin: "20px" }}>
        <option value="">All Status</option>
        <option value="In Progress">In Progress</option>
        <option value="Planning">Planning</option>
        <option value="Pending Approval">Pending Approval</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
        <option value="Under Review">Under Review</option>
      </select>

      <select className="form-control" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ margin: "20px" }}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Department</th>
            <th>Details</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {search.map((p, index) => (
            <tr key={index}>
              <td>{p.id}</td>
              <td>{p.ProjectName}</td>
              <td>{p.Department}</td>
              <td>{p.Details}</td>
              <td>{p.priority}</td>
              <td>{p.status}</td>
              <td>{new Date(p.startDate * 1000).toLocaleDateString()}</td>
              <td>{new Date(p.EndDate * 1000).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchApiProject;
