import * as fromReducer from './delivery-countries.reducer';
import * as fromActions from '../actions/delivery-countries.action';

describe('Delivery Countries Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_DELIVERTY_COUNTRIES_SUCCESS action', () => {
    it('should populate the delivery countries state entities', () => {
      const mockCountries = [
        {
          isocode: 'AL',
          name: 'Albania'
        },
        {
          isocode: 'AD',
          name: 'Andorra'
        }
      ];

      const mockCountriesList = {
        AL: mockCountries[0],
        AD: mockCountries[1]
      };

      const { initialState } = fromReducer;
      const action = new fromActions.LoadDeliveryCountriesSuccess(
        mockCountries
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockCountriesList);
    });
  });
});