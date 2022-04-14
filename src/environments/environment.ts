// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: true,
  host: 'http://localhost:8000/',
  sso_host: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize/',
  sso_client_id: 'xh2HXSreEfLIGIMx7LN6HVJUqTTh5OPg1Wrf9Pgw',
  // sso_client_id: 'vR1pU7wXWyve1rUkg0fMS6StL1Kr6paoSmRIiLXJ',
  // service_worker_url: '/ngsw-worker.js',
  VAPID_PUBLIC_KEY: 'BIH7RBzSBVprQy4-6uaUQZOp5TmrzbpCYKA2COp02jRdS1ihX2qZ3sB0SJG4_pr6G2Q2GSCfGtK8kMax19b0mz0',
  // VERSION: require('../../package.json').version,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
