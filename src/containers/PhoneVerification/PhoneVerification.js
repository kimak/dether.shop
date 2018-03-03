/* eslint max-lines: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PhoneForm from './PhoneForm';
import ValidateCodeContainer from './ValidateCode';
import LoaderScreen from '../../components/Screens/LoaderScreen';
import { getErrorMessage } from '../../helpers/apiResponse';
import {
  sendSms as sendSmsAction,
  setPhone as setPhoneAction,
  setPhoneSent as setPhoneSentAction,
  setPhoneCountry as setPhoneCountryAction,
} from '../../actions/kyc';

class PhoneVerification extends PureComponent {
  static propTypes = {
    isSubmitPhonePending: PropTypes.bool.isRequired,
    sendSms: PropTypes.func.isRequired,
    ethAddress: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
    setPhoneCountry: PropTypes.func.isRequired,
    setPhoneSent: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
    phoneCountry: PropTypes.shape({}),
    phoneSent: PropTypes.bool.isRequired
  };

  static defaultProps = {
    phoneCountry: null
  };

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: props.phone || '',
      phoneCountry: props.phoneCountry,
      error: '',
      code: null
    };
  }

  submitPhoneSuccess = ({ data }) => {
    const { phoneNumber, phoneCountry } = this.state;
    const { setPhone, setPhoneSent, setPhoneCountry } = this.props;
    this.setState({ code: data.code });
    this.setState({ lastSend: new Date() });
    setPhone(phoneNumber);
    setPhoneCountry(phoneCountry);
    setPhoneSent(true);
  };

  submitPhoneError = (errors, res) => {
    const message = getErrorMessage(errors, res);
    this.setState({ error: message });
  };

  editPhoneNumber = () => {
    const { setPhoneSent } = this.props;
    setPhoneSent(false);
  };

  submitPhone = (phoneNumber, phoneCountry) => {
    const { sendSms, ethAddress } = this.props;

    const stateToChange = phoneCountry ? { phoneNumber, phoneCountry } : { phoneNumber };
    this.setState(
      () => stateToChange,
      () => {
        sendSms({
          phoneNumber,
          ethAddress,
          onSuccess: this.submitPhoneSuccess,
          onError: this.submitPhoneError
        });
      }
    );
  };

  render = () => {
    const { lastSend, phoneNumber, phoneCountry, error, code } = this.state;
    const { phoneSent, isSubmitPhonePending } = this.props;

    if (!phoneSent && !isSubmitPhonePending) {
      return <PhoneForm submitError={error} onSubmit={this.submitPhone} country={phoneCountry} />;
    }

    if (isSubmitPhonePending) {
      return <LoaderScreen />;
    }

    return (
      <ValidateCodeContainer
        phoneNumber={phoneNumber}
        editPhoneNumber={this.editPhoneNumber}
        reSendSms={this.submitPhone}
        phoneSent={phoneSent}
        lastSend={lastSend}
        code={code}
      />
    );
  };
}

const mapStateToProps = ({ user, kyc }) => ({
  isSubmitPhonePending: kyc.isSubmitPhonePending,
  ethAddress: user.ethAddress,
  phone: kyc.phone,
  phoneSent: kyc.phoneSent,
  phoneCountry: kyc.phoneCountry
});

const mapDispatchToProps = dispatch => ({
  sendSms: params => dispatch(sendSmsAction(params)),
  setPhone: phone => dispatch(setPhoneAction(phone)),
  setPhoneCountry: country => dispatch(setPhoneCountryAction(country)),
  setPhoneSent: bool => dispatch(setPhoneSentAction(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);