# Open IoT Dashboard

> An open source, self hosted IoT dashboard

## Build Setup

``` bash
# install dependencies
$ npm install
$ brew install zmq (or as necessary for ZeroMQ on your platform)

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```
## Things to do next:

* Add datasink from external url (e.g. alpha vantage)
^^ probably taken care of by just defining offlineCode for a component, letting that fetch the data
^^^^ actually not quite true, we don't always want to save data. dataSources should be a thing, even with offline code now,
that just fetches data from a URL when the component is actually displayed.

* add, in settings, ability to directly edit the whole code of the component

* add permissions for other users to edit dashboards owned by a user

* for each datasink, add ability to edit some code that's executed when the datasink receives a new datapoint (ie for anomaly detection and alerting)

* change logo/favicon/404
