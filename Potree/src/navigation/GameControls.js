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

		this.items = [
			{
				x: -1.01643,
				y: -0.549525,
				z: -42.5016,
				isRead: false,
				id: 4
			},
			{
				x: -0.0620187,
				y: 1.1126,
				z: -42.2719,
				isRead: false,
				id: 5
			}
		]

		let onMouseDown = e => {
			let I = Utils.getMousePointCloudIntersection(
				e.mouse, 
				this.scene.getActiveCamera(), 
				this.viewer, 
				this.scene.pointclouds, 
				{pickClipped: false}
			);
			this.checkIfObject(this.items,I);
		};
		this.addEventListener('mousedown',onMouseDown);
	}

	setScene (scene) {
		this.scene = scene;
	}

	distance(object,I){
		return Math.abs(Math.pow(Math.pow(I.location.x - object.x,2) + Math.pow(I.location.y - object.y ,2) + Math.pow(I.location.z - object.z ,2) ,0.5));
	}

	checkIfObject(itemList,I){
		for (var i = 0; i<itemList.length;i++){
			if (itemList[i].isRead == false && this.distance(itemList[i],I) < 0.2) {
				this.objectFound(itemList[i]);	
			}
		}
	}

	objectFound(object){
		$.ajax({
			url: "boo/asd?id=" + object.id + '"',
			method: 'GET',
			dataType: 'text',
			success: (data) => {
				console.log(data);
			}
		});
		this.viewer.scrollbar.listRoot.append(this.viewer.scrollbar.addListItem("/witnesses/randomDice.jpg","/resources/logo.png",object.id));
		this.viewer.scrollbar.addItemEventListener(this.viewer.scrollbar.ids[this.viewer.scrollbar.ids.length - 1],this.viewer.scrollbar.itemPaths[this.viewer.scrollbar.itemPaths.length - 1]);
		this.camStart = this.scene.getActiveCamera().clone();
		object.isRead = true;
	}

	update (delta) {
		let view = this.scene.view;
		let fade = Math.pow(0.5, this.fadeFactor * delta);
		let progression = 1 - fade;
		let camera = this.scene.getActiveCamera();
	}
};