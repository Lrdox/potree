
export class Scrollbar {
    constructor(viewer){
        this.viewer = viewer;
    }

	//Add anchors and images, you can make it "easier" to add stuff by making an img and its anchor (have the same name) in 2 different methods --> try it with some random images and make some default html pages as "Profiles"
    init() {
		let elScrollbar = $('#witness_list_root');		
		 //This needs to be edited with database implemented
		elScrollbar.append("<ul>" + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + this.getContent("catWitness","witnesses") + "</ul>");
    }
		//TODO CHANGE HREF TO DYNAMIC
	getContent(contentName, contentType){
		return( `<li><a href='http://localhost:1234/examples/' target="_blank">
			<img title = "${contentName}" src="${Potree.resourcePath + '/' + contentType + '/' + contentName + '.jpg'}"/></a></li>
			`);
	}
}