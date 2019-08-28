import {MOUSE} from "../defines.js";
import {Utils} from "../utils.js";
import {EventDispatcher} from "../EventDispatcher.js";

export class GameControls extends EventDispatcher {
	constructor (viewer) {
		super(viewer);

		this.viewer = viewer;

		this.scene = null;
		this.sceneControls = new THREE.Scene();
		this.camStart = null;

		this.fadeFactor = 20;

		this.targetX = -1.45;
		this.targetY = 0.5;
		this.targetZ = -42.5;
		this.url = "/boo/asd?id=1";
		let onMouseDown = e => {
			let I = Utils.getMousePointCloudIntersection(
				e.mouse, 
				this.scene.getActiveCamera(), 
				this.viewer, 
				this.scene.pointclouds, 
				{pickClipped: false});

			if (Math.abs(Math.pow(Math.pow(I.location.x - this.targetX,2) + Math.pow(I.location.y - this.targetY ,2) + Math.pow(I.location.z - this.targetZ ,2) ,0.5) < 10)) {
				console.log(I);
				$.ajax({
					url: this.url,
					method: 'GET',
					dataType: 'text',
					success: (data) => {
						console.log(data);
					}
				});
				//this.pivot = I.location;
				this.viewer.scrollbar.listRoot.append(this.viewer.scrollbar.addListItem("/witnesses/catWitness.jpg",1));
				this.viewer.scrollbar.eventHandle(1);
				this.camStart = this.scene.getActiveCamera().clone();
			}
		};

		this.addEventListener('mousedown', onMouseDown);
	}

	setScene (scene) {
		this.scene = scene;
	}

	update (delta) {
		let view = this.scene.view;
		let fade = Math.pow(0.5, this.fadeFactor * delta);
		let progression = 1 - fade;
		let camera = this.scene.getActiveCamera();
	}
};