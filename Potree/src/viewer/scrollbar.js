
export class Scrollbar {
    constructor(viewer){
        this.viewer = viewer;

		this.listRoot = $('#list');
    }

	//Add anchors and images, you can make it "easier" to add stuff by making an img and its anchor (have the same name) in 2 different methods --> try it with some random images and make some default html pages as "Profiles"
    init() {
		this.listRoot.append(this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses"));
    }

		//TODO CHANGE HREF TO DYNAMIC
	getContent(contentName, contentType){
		return( `<li><a href="${Potree.scriptPath + '/description.html'}" target="_blank">
			<img title = "${contentName}" src="${Potree.resourcePath + '/' + contentType + '/' + contentName + '.jpg'}"/></a></li>
			`);
	}
}