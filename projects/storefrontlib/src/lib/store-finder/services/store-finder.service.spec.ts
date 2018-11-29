import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromStore from '../store';

import { StoreFinderService } from './store-finder.service';
import { WindowRef } from './window-ref';
import { LongitudeLatitude } from '../models/longitude-latitude';

fdescribe('StoreFinderService', () => {
  let service: StoreFinderService;
  let store: Store<fromStore.StoresState>;

  const queryText = 'test';
  const countryIsoCode = 'CA';
  const regionIsoCode = 'CA-QC';
  const geolocationWatchId = 1;

  const longitudeLatitude: LongitudeLatitude = {
    longitude: 10.1,
    latitude: 20.2
  };

  const MockWindowRef: WindowRef = {
    nativeWindow: {
      navigator: {
        geolocation: {
          watchPosition: callback => {
            callback({ coords: longitudeLatitude });
            return geolocationWatchId;
          },
          clearWatch: () => {}
        }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          store: combineReducers(fromStore.reducers)
        })
      ],
      providers: [
        StoreFinderService,
        { provide: WindowRef, useValue: MockWindowRef }
      ]
    });

    service = TestBed.get(StoreFinderService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should inject StoreFinderService', inject(
    [StoreFinderService],
    (storeFinderService: StoreFinderService) => {
      expect(storeFinderService).toBeTruthy();
    }
  ));

  describe('Find Stores', () => {
    it('should dispatch a new action', () => {
      service.findStores(queryText, false);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindStores({ queryText: queryText })
      );
    });
  });

  describe('Find Stores with My Location', () => {
    it('should dispatch a OnHold action and a FindStores action', () => {
      service.findStores(queryText, true);

      expect(store.dispatch).toHaveBeenCalledWith(new fromStore.OnHold());
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindStores({
          queryText,
          longitudeLatitude
        })
      );
    });
  });

  describe('View All Stores', () => {
    it('should dispatch a new action', () => {
      service.viewAllStores();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.ViewAllStores()
      );
    });
  });

  describe('View All Stores for Country', () => {
    it('should dispatch a new action', () => {
      service.viewAllStoresForCountry(countryIsoCode);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindAllStoresByCountry({ countryIsoCode })
      );
    });
  });

  describe('View All Stores for Region', () => {
    it('should dispatch a new action', () => {
      service.viewAllStoresForRegion('CA', 'CA-QC');

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindAllStoresByRegion({ countryIsoCode, regionIsoCode })
      );
    });
  });
});
