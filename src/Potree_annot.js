import { Utils } from "./utils.js";

var annotationIndex = 0;

export function addAnnotToTree(){

    //Input Declarations
	var name = document.getElementById('annotationName').value;
	//var setting = document.getElementById('annotationSetting').checked;
	var Description = document.getElementById('annotationDescription').value;
	var inputPos = [document.getElementById('annotationCoordinateX').value, document.getElementById('annotationCoordinateY').value, document.getElementById('annotationCoordinateZ').value];
	var camPos = viewer.scene.getActiveCamera().position.toArray();
    var camTar = viewer.scene.view.getPivot().toArray();


    //HTML management
	document.getElementById("annotationFormform").reset();
    document.getElementById("annotationCreate").disabled = true;
    document.getElementById("annotationButton").disabled = false;

	//viewer.postMessage('<span>'+inputPos+'</span>',{duration : 1000});

    //Create the Annotation
	if (inputPos != ",,"){
        let annotationTool = new AnnotationTool(viewer);
        viewer.scene.annotationList.push(annotationTool);
        viewer.scene.annotationList[annotationIndex].annotationMeasure.removeMarker(viewer.scene.annotationList[annotationIndex].annotationMeasure.points.length - 1);
        viewer.scene.annotationList.splice(annotationIndex++, 1);

        annotationTool.startInsertion({
            closed: true,
            maxMarkers: 1,
            position: inputPos,
            cameraPosition: camPos,
            cameraTarget: camTar,
            title: name,
            description: Description,
            create: true
        });
    }
}

export function placeAnnotation(args = {}) {

    //Input Declarations
    var inputPos = [document.getElementById('annotationCoordinateX').value, document.getElementById('annotationCoordinateY').value, document.getElementById('annotationCoordinateZ').value];
    var camPos = viewer.scene.getActiveCamera().position.toArray();
    var camTar = viewer.scene.view.getPivot().toArray();
    var name = document.getElementById('annotationName').value;
    var Description = document.getElementById('annotationDescription').value;


    //HTML management
    document.getElementById("annotationFormform").reset();
    document.getElementById("annotationName").value = name;
    document.getElementById("annotationDescription").value = Description;

    document.getElementById("annotationButton").disabled = true;
    document.getElementById("annotationCreate").disabled = false;

    let annotationTool = new AnnotationTool(viewer);
    viewer.scene.annotationList.push(annotationTool);
    //Add the Marker, 3 cases: no input, input and edit
    if (inputPos != ",,") {
        var pos = inputPos;

        annotationTool.startInsertion({
            closed: true,
            maxMarkers: 1,
            position: pos,
            cameraPosition: camPos,
            cameraTarget: camTar,
            create: false
        })
    } else if (args.editPos) {
        annotationTool.startInsertion({
            closed: true,
            maxMarkers: 1,
            position: args.editPos,
            cameraPosition: camPos,
            cameraTarget: camTar,
            create: false
        })
    } else {
		annotationTool.startInsertion({
			closed: true,
			maxMarkers: 1,
			position: false,
			cameraPosition: camPos,
			cameraTarget: camTar,
			create: false
		})
	}
}

export function clearForm(){
	document.getElementById("annotationCoordinateX").value = "";
	document.getElementById("annotationCoordinateY").value = "";
	document.getElementById("annotationCoordinateZ").value = "";
}

export class AnnotationMeasure extends THREE.Object3D {
    constructor() {
        super();

        this.constructor.counter = (this.constructor.counter === undefined) ? 0 : this.constructor.counter + 1;

        this.name = 'Annotation_' + this.constructor.counter;
        this.points = [];
        this._closed = true;
        this.maxMarkers = Number.MAX_SAFE_INTEGER;

        this.sphereGeometry = new THREE.SphereGeometry(0.5, 10, 10);
        this.color = new THREE.Color(0xff0000);

        this.spheres = [];

        this.secondaryUpdate = false;

        this.eventHandler = (e) => {
            this.secondaryUpdate = true;
            var point = { position: new THREE.Vector3(parseFloat(e.value[0]), parseFloat(e.value[1]), parseFloat(e.value[2])) };
            this.points[0] = point;
            this.setPosition(0, point.position.clone());
            this.update();
        };
    }

	createSphereMaterial () {
		let sphereMaterial = new THREE.MeshLambertMaterial({
			shading: THREE.SmoothShading,
			color: this.color,
			depthTest: false,
			depthWrite: false}
		);

		return sphereMaterial;
	};



    addMarker(point) {
        if (point instanceof THREE.Vector3) {
			point = {position: point};
		}else if(point instanceof Array){
			point = {position: new THREE.Vector3(...point)};
        }
        this.points.push(point.position);

		// sphere
		let sphere = new THREE.Mesh(this.sphereGeometry, this.createSphereMaterial());
		this.add(sphere);
		this.spheres.push(sphere);

        viewer.scene.addEventListener("annotationMarker_moved", this.eventHandler);

		{ // Event Listeners
			let drag = (e) => {
				let I = Utils.getMousePointCloudIntersection(
					e.drag.end, 
					e.viewer.scene.getActiveCamera(), 
					e.viewer, 
					e.viewer.scene.pointclouds,
					{pickClipped: true});

                if (I) {
                    let i = this.spheres.indexOf(e.drag.object);
					if (i !== -1) {
                        let point = this.points[i];
						for (let key of Object.keys(I.point).filter(e => e !== 'position')) {
							point[key] = I.point[key];
						}

						this.setPosition(i, I.location);
					}
				}
            };

			let drop = e => {
				let i = this.spheres.indexOf(e.drag.object);
				if (i !== -1) {
					this.dispatchEvent({
						'type': 'marker_dropped',
						'annotation': this,
						'index': i
					});
				}
            };

			let mouseover = (e) => e.object.material.emissive.setHex(0x888888);
			let mouseleave = (e) => e.object.material.emissive.setHex(0x000000);

			sphere.addEventListener('drag', drag);
			sphere.addEventListener('drop', drop);
			sphere.addEventListener('mouseover', mouseover);
			sphere.addEventListener('mouseleave', mouseleave);
		}

		let event = {
			type: 'marker_added',
			annotation: this,
			sphere: sphere
		};
		this.dispatchEvent(event);

		this.setMarker(this.points.length - 1, point);
	};

    removeMarker(index) {
        viewer.scene.removeEventListener("annotationMarker_moved", this.eventHandler);

		this.points.splice(index, 1);

		this.remove(this.spheres[index]);

		this.spheres.splice(index, 1);

		this.update();

        this.dispatchEvent({ type: 'marker_removed', measurement: this });
	};

	setMarker (index, point) {
		this.points[index] = point;

		let event = {
			type: 'marker_moved',
			measure:	this,
            index: index,
            position: point.position.clone()
		};
		this.dispatchEvent(event);
	
		this.update();
	}

    setPosition(index, position) {
        this.secondaryUpdate = false;

		let point = this.points[index];
		point.position.copy(position);

        let event = {
            type: 'marker_moved',
            measure: this,
            index: index,
            position: position.clone()
        };

		this.dispatchEvent(event);

		this.update();
    };

    update() {
		if (this.points.length === 0) {
			
			return;
		} else if (this.points.length === 1) {
			let point = this.points[0];
            let position = point.position;
            this.spheres[0].position.copy(position);
            //Annotation Coordinates Update
            if (!this.secondaryUpdate) {
                var name = document.getElementById('annotationName').value;
                var Description = document.getElementById('annotationDescription').value;  
                document.getElementById("annotationFormform").reset();
                document.getElementById("annotationName").value = name;
                document.getElementById("annotationDescription").value = Description;

                document.getElementById('annotationCoordinateX').setAttribute('value', position.toArray()[0]);
                document.getElementById('annotationCoordinateY').setAttribute('value', position.toArray()[1]);
                document.getElementById('annotationCoordinateZ').setAttribute('value', position.toArray()[2]);
            }	
			return;
		}
	};

	get closed () {
		return this._closed;
	}

	set closed (value) {
		this._closed = value;
		this.update();
	}
};

export class AnnotationTool extends THREE.EventDispatcher {
	constructor (viewer) {
		super();

		this.viewer = viewer;
		this.renderer = viewer.renderer;

		this.scene = new THREE.Scene();
		this.scene.name = 'scene_annotation';
		this.light = new THREE.PointLight(0xffffff, 1.0);
		this.scene.add(this.light);

		this.viewer.inputHandler.registerInteractiveScene(this.scene);

		this.onRemove = (e) => { this.scene.remove(e.measurement);};
		this.onAdd = e => {this.scene.add(e.measurement);};

		for(let measurement of viewer.scene.measurements){
			this.onAdd({measurement: measurement});
        }

        this.annotationMeasure = new AnnotationMeasure();


		viewer.addEventListener("update", this.update.bind(this));
		viewer.addEventListener("render.pass.perspective_overlay", this.render.bind(this));
		viewer.addEventListener("scene_changed", this.onSceneChange.bind(this));

		viewer.scene.addEventListener('annotation_added', this.onAdd);
		viewer.scene.addEventListener('annotation_removed', this.onRemove);
	}

	onSceneChange(e){
		if(e.oldScene){
			e.oldScene.removeEventListener('annotation_added', this.onAdd);
			e.oldScene.removeEventListener('annotation_removed', this.onRemove);
		}

		e.scene.addEventListener('annotation_added', this.onAdd);
		e.scene.addEventListener('annotation_removed', this.onRemove);
	}

    startInsertion(args = {}) {
        let domElement = this.viewer.renderer.domElement;

        this.annotationMeasure.closed = args.closed || false;
        this.annotationMeasure.maxMarkers = args.maxMarkers || Infinity;

        let cancel = {
            removeLastMarker: true,
            callback: null
        };

        let insertionCallback = (e) => {
            if (e.button === THREE.MOUSE.RIGHT) {
                cancel.removeLastMarker = true;

                var name = document.getElementById('annotationName').value;
                var Description = document.getElementById('annotationDescription').value;
                document.getElementById("annotationFormform").reset();
                document.getElementById("annotationName").value = name;
                document.getElementById("annotationDescription").value = Description;
                document.getElementById('annotationCoordinateX').setAttribute('value', "");
                document.getElementById('annotationCoordinateY').setAttribute('value', "");
                document.getElementById('annotationCoordinateZ').setAttribute('value', "");
                document.getElementById("annotationCreate").disabled = true;
                document.getElementById("annotationButton").disabled = false;

                viewer.scene.annotationList.splice(annotationIndex, 1);
                cancel.callback();
            }
        };

        cancel.callback = e => {
            if (cancel.removeLastMarker) {
                this.annotationMeasure.removeMarker(this.annotationMeasure.points.length - 1);
            }
            domElement.removeEventListener('mouseup', insertionCallback, true);
            this.viewer.removeEventListener('cancel_insertions', cancel.callback);
        };

        this.viewer.addEventListener('cancel_insertions', cancel.callback);
        domElement.addEventListener('mouseup', insertionCallback, true);

        if (args.create == true) {
            this.viewer.scene.addAnnotation(args.position,
                {
                    cameraPosition: args.cameraPosition,
                    cameraTarget: args.cameraTarget,
                    title: args.title,
                    description: args.description
                });
        } else if ((args.create == false) && (args.position != false)) {
            this.annotationMeasure.addMarker(new THREE.Vector3(parseFloat(args.position[0]), parseFloat(args.position[1]), parseFloat(args.position[2])));
            this.viewer.inputHandler.startDragging(
                this.annotationMeasure.spheres[this.annotationMeasure.spheres.length - 1]);
            this.scene.add(this.annotationMeasure);
        }else {
            this.annotationMeasure.addMarker(new THREE.Vector3(0, 0, 0));
			this.viewer.inputHandler.startDragging(
                this.annotationMeasure.spheres[this.annotationMeasure.spheres.length - 1]);
            this.scene.add(this.annotationMeasure);
		}
		
        return this.annotationMeasure;
	}
	
	update(){
		let camera = this.viewer.scene.getActiveCamera();
		//let domElement = this.renderer.domElement;
		let measurements = this.viewer.scene.measurements;

		let clientWidth = this.renderer.getSize().width;
		let clientHeight = this.renderer.getSize().height;

		this.light.position.copy(camera.position);

		// make size independent of distance

	}

	render(){
		this.viewer.renderer.render(this.scene, this.viewer.scene.getActiveCamera());
	}
};
