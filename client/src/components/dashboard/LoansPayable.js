import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
// import { connect } from "react-redux";

const LoansPayable = ({ loan }) => {
  const loans = loan.map(lo =>
    lo.accountPayable > 0 ? (
      <tr key={lo._id}>
        <td>{lo.title}</td>
        <td className="hide-sm">{lo.description}</td>
        <td className="hide-sm">{lo.relationship}</td>
        <td className="hide-sm">Account Payable: ${lo.accountPayable}</td>
        <td className="hide-sm">{lo.interestRate}%</td>
        <td>
          From: <Moment format="YYYY/MM/DD">{lo.from}</Moment> - To: <Moment format="YYYY/MM/DD">{lo.to}</Moment>
        </td>
      </tr>
    ) : null
  );

  return (
    <Fragment>
      <h2 className="my-2">Loan Payable</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Loan Title</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Relationship</th>
            <th className="hide-sm">Account Receivable/Payable</th>
            <th className="hide-sm">Interest Rate</th>
            <th className="hide-sm">Time</th>
          </tr>
        </thead>
        <tbody>{loans}</tbody>
      </table>
    </Fragment>
  );
};

LoansPayable.propTypes = {
  loan: PropTypes.array.isRequired
};

export default LoansPayable;
