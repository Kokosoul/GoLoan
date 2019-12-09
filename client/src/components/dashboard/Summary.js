import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import Moment from "react-moment";
// import { connect } from "react-redux";

const Summary = ({ loan }) => {
  let loansR = 0;
  loan.forEach(lo => (loansR += lo.accountReceivable ? lo.accountReceivable * (1 + lo.interestRate * 0.01) : 0));
  let loansP = 0;
  loan.forEach(lo => (loansP += lo.accountPayable ? lo.accountPayable * (1 + lo.interestRate * 0.01) : 0));

  return (
    <Fragment>
      <h2 className="my-2">Summary</h2>
      <p>Total Account Receivable: ${loansR}</p>
      <p>Total Account Payable: ${loansP}</p>
    </Fragment>
  );
};

Summary.propTypes = {
  loan: PropTypes.array.isRequired
};

export default Summary;
