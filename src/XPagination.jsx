import React from "react";

const XPagination = () => {
    const [employees, setEmployees] = React.useState([]);
    const [currentPage, setCurrentPage] =React.useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayItems = employees.slice(startIndex, endIndex)
    const totalPages = Math.ceil(employees.length / itemsPerPage);


    const handlePrevPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }

    const handleNextPage=()=>{
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1)
        }
    }

    React.useEffect(() => {
      
            const fetchEmployeesData = async ()=>{
                try {
                    const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setEmployees(data);
                } catch (error) {
                    console.error("Error fetching employee data:", error);
                    
                }
            }
            fetchEmployeesData();

    }, []);


    

  return (
    <div className="xPagination">
      <div className="xPaginationContainer">
        <h3 className="xPaginationTitle">Employee Data Table</h3>
        <table className="xPaginationTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((employee) => (
              <tr key={`${employee.id}-${employee.name}`}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="xPaginationControls">
          <button className="xPaginationButton" id="prevBtn" onClick={handlePrevPage} disabled={currentPage===1}>
            Previous
          </button>
          <span className="xPaginationPageInfo">{currentPage}</span>
          <button className="xPaginationButton" id="nextBtn" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default XPagination;
