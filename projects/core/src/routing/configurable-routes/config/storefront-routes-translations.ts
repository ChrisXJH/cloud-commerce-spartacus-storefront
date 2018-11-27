/**
 * Translations in this file cover only routes of Storefront lib
 *
 * Translations for custom pages are covered by RoutesTranslations interface
 */

import { ParamsMapping } from '../routes-config';

interface StorefrontRouteTranslation {
  paths?: string[];
  paramsMapping?: ParamsMapping;
}

export interface StorefrontRoutesTranslations {
  homepage?: StorefrontRouteTranslation;
  cart?: StorefrontRouteTranslation;
  search?: StorefrontRouteTranslation;
  login?: StorefrontRouteTranslation;
  register?: StorefrontRouteTranslation;
  resetNewPassword?: StorefrontRouteTranslation;
  resetPassword?: StorefrontRouteTranslation;
  checkout?: StorefrontRouteTranslation;
  orderConfirmation?: StorefrontRouteTranslation;
  product?: StorefrontRouteTranslation;
  category?: StorefrontRouteTranslation;
  storeFinder?: {
    paths?: string[];
    children?: {
      searchResult?: StorefrontRouteTranslation;
      allStores?: StorefrontRouteTranslation;
      listStores?: StorefrontRouteTranslation;
      storeDescription?: StorefrontRouteTranslation;
    };
  };
  termsAndConditions?: StorefrontRouteTranslation;
  contact?: StorefrontRouteTranslation;
  help?: StorefrontRouteTranslation;
  sale?: StorefrontRouteTranslation;
  myAccount_orders?: StorefrontRouteTranslation;
  myAccount_orderDetails?: StorefrontRouteTranslation;
  pageNotFound?: StorefrontRouteTranslation;
}
