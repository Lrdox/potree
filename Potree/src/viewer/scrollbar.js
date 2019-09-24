
export class Scrollbar {
    constructor(viewer){
        this.viewer = viewer;
		this.ids = [];
		this.itemPaths = [];
		this.lastElement = undefined;

		this.listRoot = $('#list');
    }


    init() {
		this.listRoot.append(
		this.addListItem("/witnesses/imageExample.jpg","/resources/witnesses/exampleText.txt",1),
		this.addListItem("/witnesses/catWitness.jpg","/description.html",2));
		//THERE NEEDS TO BE AN ADDED ATTRIBUTE THAT CONTAINS THE PATH
		for (var i = 0; i<this.ids.length; i++){
			this.addItemEventListener(this.ids[i],this.itemPaths[i]);
		}
    }

	addListItem(path,itemPath,id){
		this.ids.push(id);
		this.itemPaths.push(itemPath);
		return(`
			<li><img id="${id}"src="${Potree.resourcePath + path}"/></li>
		`);
	}

	//ADD A SECOND FUNCTION PARAMETER
	addItemEventListener(id,path){
		this.lastElement = document.getElementById(id);
		this.lastElement.addEventListener('click', () => {
			viewer.itemArea.includeContent("includedContent",path);
			if (viewer.itemArea.enabled == false){
				viewer.toggleItemArea();
			}
		});
	}
}