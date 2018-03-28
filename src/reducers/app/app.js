import config from '../../constants/config';

export const initialState = {
  isMetamaskInstalled: false,
  isAppInitialized: false,
  isTermsModalOpenened: false,
  ethNetwork: null,
  areTermsAccepted: false,
  licencePrice: null
};

/**
 * [hasGoodNetwork description]
 * @param  {[type]}  ethNetwork [description]
 * @return {Boolean}            [description]
 */
export const hasGoodNetwork = ({ ethNetwork }) => !!ethNetwork && ethNetwork === config.ethNetwork;

export const isLicencePriceSet = ({ licencePrice }) => licencePrice != null;

/**
 * appReducer
 */
const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_METAMASK_INSTALLED':
      return { ...state, isMetamaskInstalled: payload };
    case 'SET_APP_INITIALIZED':
      return { ...state, isAppInitialized: payload };
    case 'TOGGLE_TERMS_MODAL':
      return { ...state, isTermsModalOpenened: !state.isTermsModalOpenened };
    case 'SET_ETH_NETWORK':
      return { ...state, ethNetwork: payload };
    case 'ACCEPT_TERMS':
      return { ...state, areTermsAccepted: true };
    case 'SET_LICENCE_PRICE':
      return { ...state, licencePrice: payload };
    default:
      return state;
  }
};

export default appReducer;
