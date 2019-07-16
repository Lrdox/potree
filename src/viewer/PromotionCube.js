
export class PromotionCube extends THREE.Object3D {

	constructor(viewer){
		super();

		this.viewer = viewer;

		let createPlaneMaterial = (img) => {
			let material = new THREE.MeshBasicMaterial( {
				depthTest: true, 
				depthWrite: true,
				side: THREE.DoubleSide
			});
			new THREE.TextureLoader().load(
				exports.resourcePath + '/textures/promotion/' + img,
				function(texture) {
					texture.anisotropy = viewer.renderer.capabilities.getMaxAnisotropy();
					material.map = texture;
					material.needsUpdate = true;
				});
			return material;
		};

		let planeGeometry = new THREE.PlaneGeometry(1, 1);

		this.front = new THREE.Mesh(planeGeometry, createPlaneMaterial('ulb.png'));
		this.front.position.y = -0.5;
		this.front.rotation.x = Math.PI / 2.0;
		this.front.updateMatrixWorld();
		this.front.name = "http://www.ulb.be/";
		this.add(this.front);
		
		this.back = new THREE.Mesh(planeGeometry, createPlaneMaterial('alice.png'));
		this.back.position.y = 0.5;
		this.back.rotation.x = Math.PI / 2.0;
		this.back.updateMatrixWorld();
		this.back.name = "http://www.alicelab.be/";
		this.add(this.back);

		this.left = new THREE.Mesh(planeGeometry, createPlaneMaterial('lisa.png'));
		this.left.position.x = -0.5;
		this.left.rotation.y = Math.PI / 2.0;
		this.left.updateMatrixWorld();
		this.left.name = "https://lisa.ulb.ac.be/";
		this.add(this.left);

		this.right2 = new THREE.Mesh(planeGeometry, createPlaneMaterial('crea.png'));
		this.right2.position.x = 0.5;
		this.right2.rotation.y = Math.PI / 2.0;
		this.right2.updateMatrixWorld();
		this.right2.name = "http://crea.ulb.ac.be/";
		this.add(this.right2);

		this.bottom2 = new THREE.Mesh(planeGeometry, createPlaneMaterial('panorama2.png'));
		this.bottom2.position.z = -0.5;
		this.bottom2.updateMatrixWorld();
		this.bottom2.name = "http://panorama.ulb.ac.be/";
		this.add(this.bottom2);

		this.top = new THREE.Mesh(planeGeometry, createPlaneMaterial('panorama.png'));
		this.top.position.z = 0.5;
		this.top.updateMatrixWorld();
		this.top.name = "http://panorama.ulb.ac.be/";
		this.add(this.top);

		this.width = 150; // in px

		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
		this.camera.position.copy(new THREE.Vector3(0, 0, 0));
		this.camera.lookAt(new THREE.Vector3(0, 1, 0));
		this.camera.updateMatrixWorld();
		this.camera.rotation.order = "ZXY";


		let onMouseDown = (event) => {
			this.pickedFace = null;
			let mouse = new THREE.Vector2();
			mouse.x = event.clientX - (window.innerWidth - this.width);
			mouse.y = event.clientY - (window.innerHeight - this.width);;

			if(mouse.x < 0 || mouse.y < 0) return;
			
			mouse.x = (mouse.x / this.width) * 2 - 1;
			mouse.y = -(mouse.y / this.width) * 2 + 1;

			let raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse, this.camera);
			raycaster.ray.origin.sub(this.camera.getWorldDirection());

			let intersects = raycaster.intersectObjects(this.children);

			let minDistance = 1000;
			for (let i = 0; i < intersects.length; i++) {
				if(intersects[i].distance < minDistance) {
					this.pickedFace = intersects[i].object.name;
					minDistance = intersects[i].distance;
				}
			}
			if(this.pickedFace) {
				//viewer.postMessage(`<span>`+this.pickedFace+`</span>`, {duration: 2000});
				//window.open(this.pickedFace, "_blank"); 
				
				var evLink = document.createElement('a');
				evLink.href = this.pickedFace;
				evLink.target = '_blank';
				document.body.appendChild(evLink);
				evLink.click();
				evLink.parentNode.removeChild(evLink);
			}
		};

		this.viewer.renderer.domElement.addEventListener('mousedown', onMouseDown, false);
	}

	update(rotation) {
		this.camera.rotation.copy(rotation);
		this.camera.updateMatrixWorld();
	}

}