import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { LongitudeLatitude } from '../models/longitude-latitude';
import { WindowRef } from './window-ref';

import * as fromStore from '../store';

@Injectable()
export class StoreFinderService {
  private geolocationWatchId: number = null;

  constructor(
    private store: Store<fromStore.StoresState>,
    private winRef: WindowRef
  ) {}

  findStores(queryText: string, useMyLocation?: boolean) {
    if (useMyLocation) {
      this.clearWatchGeolocation(new fromStore.OnHold());
      this.geolocationWatchId = this.winRef.nativeWindow.navigator.geolocation.watchPosition(
        (pos: Position) => {
          const longitudeLatitude: LongitudeLatitude = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          };
          this.clearWatchGeolocation(
            new fromStore.FindStores({ queryText, longitudeLatitude })
          );
        }
      );
    } else {
      this.clearWatchGeolocation(new fromStore.FindStores({ queryText }));
    }
  }

  viewAllStores() {
    this.clearWatchGeolocation(new fromStore.ViewAllStores());
  }

  viewAllStoresForCountry(countryIsoCode: string) {
    this.clearWatchGeolocation(
      new fromStore.FindAllStoresByCountry({ countryIsoCode })
    );
  }

  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {
    this.clearWatchGeolocation(
      new fromStore.FindAllStoresByRegion({ countryIsoCode, regionIsoCode })
    );
  }

  private clearWatchGeolocation(callbackAction: Action) {
    if (this.geolocationWatchId !== null) {
      this.winRef.nativeWindow.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
    this.store.dispatch(callbackAction);
  }
}
