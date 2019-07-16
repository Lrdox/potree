/**
 *
 * @author sigeom sa / http://sigeom.ch
 * @author Ioda-Net Sàrl / https://www.ioda-net.ch/
 * @author Markus Schütz / http://potree.org
 *
 */

import {Measure} from "../utils/Measure.js";

export class GeoJSONExporter{

    static annotationToFeatures(annotation) {
        let coords = []
        for (let i = 0; i < 3; i++) {
            coords.push(parseFloat(annotation.position.toArray()[i]));
        }

        let feature = {
            name: annotation._title,
            coordinates: coords,
            description: annotation._description,
            cameraPosition: annotation.cameraPosition,
            cameraTarget: annotation.cameraTarget
        }

        return feature;
    }

    static toStringAnnot(annotations) {
        let Annotations = [];

        let length = annotations.length;

        for (let i = 0; i < length; i++) {
            let f = GeoJSONExporter.annotationToFeatures(annotations[i]);

            Annotations = Annotations.concat(f);
        }

        return Annotations;
    }

	static measurementToFeatures (measurement) {
		let coords = measurement.points.map(e => e.position.toArray());

		let features = [];

		if (coords.length === 1) {
			let feature = {
				geometry: {
					type: 'Point',
					coordinates: coords[0]
				},
				properties: {
					name: measurement.name
				}
			};
			features.push(feature);
		} else if (coords.length > 1 && !measurement.closed) {
			let object = {
				'geometry': {
					'type': 'LineString',
					'coordinates': coords
				},
				'properties': {
					name: measurement.name
				}
			};

			features.push(object);
		} else if (coords.length > 1 && measurement.closed) {
			let object = {
				'geometry': {
					'type': 'Polygon',
					'coordinates': [[...coords, coords[0]]]
				},
				'properties': {
					name: measurement.name
				}
			};
			features.push(object);
		}

		if (measurement.showDistances) {
			measurement.edgeLabels.forEach((label) => {
				let labelPoint = {
					geometry: {
						type: 'Point',
						coordinates: label.position.toArray()
					},
					properties: {
						distance: label.text
					}
				};
				features.push(labelPoint);
			});
		}

		if (measurement.showArea) {
			let point = measurement.areaLabel.position;
			let labelArea = {
				geometry: {
					type: 'Point',
					coordinates: point.toArray()
				},
				properties: {
					area: measurement.areaLabel.text
				}
			};
			features.push(labelArea);
		}

		return features;
	}

	static toString (measurements) {
		if (!(measurements instanceof Array)) {
			measurements = [measurements];
		}

		measurements = measurements.filter(m => m instanceof Measure);

		let features = [];
		for (let measure of measurements) {
			let f = GeoJSONExporter.measurementToFeatures(measure);

			features = features.concat(f);
		}

		let geojson = {
			'type': 'FeatureCollection',
			'features': features
		};

        return geojson;
	}

}
