import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteLoan } from "../../actions/profile";
const LoansReceivable = ({ deleteLoan, loan }) => {
  const loans = loan.map(lo =>
    lo.accountReceivable > 0 ? (
      <tr key={lo._id}>
        <td>{lo.title}</td>
        <td className="hide-sm">{lo.description}</td>
        <td className="hide-sm">{lo.relationship}</td>
        <td className="hide-sm">Account Receivable: ${lo.accountReceivable}</td>
        <td className="hide-sm">{lo.interestRate}%</td>
        <td>
          From: <Moment format="YYYY/MM/DD">{lo.from}</Moment> - To: <Moment format="YYYY/MM/DD">{lo.to}</Moment>
        </td>
        <td>
          <button
            onClick={e => {
              e.preventDefault();
              deleteLoan(e._id);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ) : null
  );

  return (
    <Fragment>
      <h2 className="my-2">Loans Receivable</h2>
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

LoansReceivable.propTypes = {
  loan: PropTypes.array.isRequired
};

export default connect(null, { deleteLoan })(LoansReceivable);
