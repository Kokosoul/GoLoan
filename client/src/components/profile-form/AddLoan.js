import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLoan } from "../../actions/profile";
const AddLoan = ({ addLoan, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    relationship: "",
    accountReceivable: 0,
    accountPayable: 0,
    interestRate: 0,
    from: "",
    to: ""
  });

  //   const [borrow, toggleBorrow] = useState(false);

  const { title, description, relationship, accountReceivable, accountPayable, interestRate, from, to } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className="large text-primary">Add A Loan</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add a loan that you would like to receive or pay.
      </p>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          console.log(formData);
          addLoan(formData, history);
        }}
      >
        <div className="form-group">
          <input type="text" placeholder="Loan Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Name of Receiver/Provider" name="relationship" value={relationship} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <p>
            <input type="text" name="accountReceivable" value={accountReceivable} onChange={e => onChange(e)} /> Account Receivable
          </p>
        </div>
        <div className="form-group">
          <p>
            <input type="text" name="accountPayable" value={accountPayable} onChange={e => onChange(e)} /> Account Payable
          </p>
        </div>
        <div className="form-group">
          <p>
            <input type="text" name="interestRate" value={interestRate} onChange={e => onChange(e)} /> Interest Rate
          </p>
        </div>

        <div className="form-group">
          <textarea name="description" cols="30" rows="5" placeholder="Loan Description" value={description} onChange={e => onChange(e)}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" to="/dashboard">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddLoan.propTypes = {
  addLoan: PropTypes.func.isRequired
};

export default connect(null, { addLoan })(AddLoan);
