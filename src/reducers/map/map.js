import { uniqueArray } from '../../helpers';

const initialState = {
  userPosition: { lat: 48.8628, lng: 2.3292 },
  centerPosition: { lat: 48.8628, lng: 2.3292 },
  contentOnCard: {},
  mapInitiated: false,
  cardOpened: false,
  userInfo: {},
  shops: [],
};

/**
 * mapReducer
 */
const mapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER_POSITION':
      return { ...state, userPosition: payload };
    case 'SET_CENTER_POSITION':
      return { ...state, centerPosition: payload };
    case 'SET_MAP_INITIATED':
      return { ...state, mapInitiated: true };
    case 'FETCH_USER_INFO_SUCCESS': {
      const infos = payload.data;
      return {
        ...state,
        userInfo: { iso: infos.country, postcode: infos.postal },
      };
    }
    case 'FETCH_SHOPS_SUCCESS': {
      const { shops } = payload.data;
      const fakes = [
        {
          id: '5abfbdb1ca23ebc573adfb9a',
          lat: 43.17207516135946,
          lng: -8.79624179081452,
          name: 'portugal',
        },
        {
          id: '5abfbdb1ca23ebc573adfb9d',
          name: 'sud america',
          lat: 5.787907970157472,
          lng: -55.63989250695488,
        },
        {
          id: '5abfbdb1ca23ebc573adfb9y',
          name: 'ireland',
          lat: 52.266318886285866,
          lng: -9.76098625695488,
        },
        ,
        {
          id: '5abfbdb1ca23ebc573adfb9z',
          name: 'bretagne',
          lat: 48.143127901054406,
          lng: -4.13803866581452,
        },
      ];
      return {
        ...state,
        shops: uniqueArray([...fakes /* , ...state.shops, ...shops */], 'id'),
      };
    }
    case 'FETCH_POSITION_BY_IP_SUCCESS': {
      const loc = payload.data.loc.split(',').map(l => parseFloat(l));
      const position = { lat: loc[0], lng: loc[1] };
      return { ...state, userPosition: position, centerPosition: position };
    }
    case 'SET_SHOP_ON_CARD':
      return {
        ...state,
        contentOnCard: {
          type: 'shop',
          content: payload,
        },
        cardOpened: true,
      };
    case 'OPEN_CARD':
      return { ...state, cardOpened: true };
    case 'CLOSE_CARD':
      return { ...state, cardOpened: false, contentOnCard: {} };
    case 'RESET_SHOPS':
      return { ...state, shops: [] };
    default:
      return state;
  }
};

export default mapReducer;
