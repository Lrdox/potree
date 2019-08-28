
export class Scrollbar {
    constructor(viewer){
        this.viewer = viewer;
		this.ids = [];
		this.lastElement = undefined;

		this.listRoot = $('#list');
    }

	//Add anchors and images, you can make it "easier" to add stuff by making an img and its anchor (have the same name) in 2 different methods --> try it with some random images and make some default html pages as "Profiles"
    init() {
		//this.listRoot.append(this.getContent("catWitness","witnesses"));
		this.listRoot.append(this.addListItem("/witnesses/catWitness.jpg",4),this.addListItem("/witnesses/catWitness.jpg",2),this.addListItem("/witnesses/catWitness.jpg",3));
		//THERE NEEDS TO BE AN ADDED ATTRIBUTE THAT CONTAINS THE PATH
		for (var i = 0; i<this.ids.length; i++){
			this.eventHandle(this.ids[i]);
		}
    }

	addListItem(path,id){
		this.ids.push(id);
		return(`
			<li><img id="${id}"src="${Potree.resourcePath + path}"/></li>
		`);
	}

	//ADD A SECOND FUNCTION PARAMETER
	eventHandle(id){
		this.lastElement = document.getElementById(id);
		this.lastElement.addEventListener('click', () => {
			if (viewer.itemArea.enabled == true){
				viewer.itemArea.includeContent("includedContent","/description.html");
			}else{
				viewer.itemArea.includeContent("includedContent","/resources/witnesses/Witness.txt");
				viewer.toggleItemArea();
			}
		});
	}
}