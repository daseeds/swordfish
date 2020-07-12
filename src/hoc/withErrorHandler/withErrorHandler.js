import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }
        componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                console.log(req)
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => {
                console.log("[withErrorHandler] ", res);
                return res;
            }, error => {
                this.setState({error:error});
                console.log("[withErrorHandler] " + error + " state.error=" + this.state.error);
                return error;
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            //console.log("[withErrorHandler] state.error=" + this.state.error);
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;