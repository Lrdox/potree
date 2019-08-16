
export class Scrollbar {
    constructor(viewer){
        this.viewer = viewer;
    }

	//Add anchors and images, you can make it "easier" to add stuff by making an img and its anchor (have the same name) in 2 different methods --> try it with some random images and make some default html pages as "Profiles"
    init() {
		let elScrollbar = $('#object_list_root');		
		 //This needs to be edited when database is implemented
		elScrollbar.append("<ul>" + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + "</ul>");
    }
		//TODO CHANGE HREF TO DYNAMIC
	getContent(contentName, contentType){
		return( `<li><a href="${Potree.scriptPath + '/description.html'}" target="_blank">
			<img title = "${contentName}" src="${Potree.resourcePath + '/' + contentType + '/' + contentName + '.jpg'}"/></a></li>
			`);
	}
}