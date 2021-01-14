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
import { Projection } from 'ol/proj';

var vectorSource = new VectorSource();
var vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33'
            })
        })
    })
});

// http://192.168.99.100:32772/data/golan_05m/{z}/{x}/{y}.png
// http://192.168.99.100:8080/data/openmaptiles_satellite_lowres/{z}/{x}/{y}.jpg

const sateliteSource = new XYZ({
    url: 'http://192.168.99.100:32806/data/golan_maptiler_10mres/{z}/{x}/{y}.png',
    crossOrigin: 'anonymous',
    // tileGrid: new TileGrid({
    //     extent: getProjection('EPSG:3857').getExtent(),
    //     resolutions: createXYZ().getResolutions().slice(1)
    // })
});

var sateliteLayer = new TileLayer({
    source: sateliteSource,
    style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33'
            })
        })
    })
})

// x: 35.382264 
// y: 33.222454

// 35.1074244, 33.4066986, 35.6571035, 33.0382097

var map = new Map({
    target: 'map',
    layers: [
        sateliteLayer,
        vectorLayer,
        // new Tile({
        //     source: new XYZ({
        //     url: "C/Projects/mbutil-master/mbtiles-golan/{z}/{x}/{y}.png"
        // }),        
    //}),
    new TileLayer({
        source: new TileDebug()
      })       
    ],
    view: new View({
        center: [9812, 6600],
        zoom: 14
    })
});

var modify = new Modify({ source: vectorSource });
map.addInteraction(modify);

var draw, snap; // global so we can remove them later
var typeSelect = document.getElementById('type');

function addInteractions() {
    draw = new Draw({
        source: vectorSource,
        type: typeSelect.value
    });
    map.addInteraction(draw);
    snap = new Snap({ source: vectorSource });
    map.addInteraction(snap);

}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
};

addInteractions();
