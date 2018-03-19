import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmitHandle = this.formSubmitHandle.bind(this);
    }

    formSubmitHandle(values) {
        this.props.customSubmitHandler(values);
        this.props.reset();
    }

    render() {
        const {handleSubmit, children} = this.props;
        return (
            <form onSubmit={handleSubmit(this.formSubmitHandle)}>
                {children}
            </form>
        );
    }
}

FormContainer.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    reset: PropTypes.func.isRequired,
    customSubmitHandler: PropTypes.func.isRequired,
};

export default reduxForm()(FormContainer);
