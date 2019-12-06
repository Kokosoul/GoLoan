import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Add Bank Account
      </Link>
      <Link to="/add-loan" className="btn btn-light">
        <i className="fas fa-dollar-sign text-primary"></i> Add Loan
      </Link>
    </div>
  );
};

export default DashboardActions;
