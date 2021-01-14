// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import Tile from 'ol/layer/Tile';
import VectorTile from 'ol/layer/VectorTile';
import Source from 'ol/source/Source';
import XYZ from 'ol/source/XYZ';
import {createXYZ} from 'ol/tilegrid.js';
import {get as getProjection} from 'ol/proj.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileJSON from 'ol/source/TileJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import {OSM, TileDebug} from 'ol/source';
import { fromLonLat, transformExtent } from 'ol/proj';


// <input id="slider" type="range" min="0" max="1" step="0.1" value="1" oninput="layer.setOpacity(this.value)">

var mapExtent = transformExtent([35.107424, 33.038186, 35.657138, 33.406699], 'EPSG:4326', 'EPSG:3857');
var mapMinZoom = 9;
var mapMaxZoom = 13;
var layer = new Tile({
  extent: mapExtent,
  source: new XYZ({
    attributions: 'maptiler; Rendered with <a href="https://www.maptiler.com/desktop/">MapTiler Desktop</a>',
    url: "http://192.168.99.100:32811/data/golan_maptiler_10mres/{z}/{x}/{y}.png",
    tilePixelRatio: 1.00000000,
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom
  })
});

// var osm = new Tile({
//   source: new OSM()
// });

var map = new Map({
  target: 'map',
  layers: [
    // osm,
    layer
  ],
  view: new View({
    center: fromLonLat([35.382281, 33.222442]),
    zoom: 10
  })
});
