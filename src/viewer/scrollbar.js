
export class Scrollbar {
    constructor(viewer){
        this.viewer = viewer;
    }

    init() {
		let elScrollbar = $('#witness_list_root');
		let content = `
			<li><img title = "Witness Name" src="https://www.newton.ac.uk/files/covers/968361.jpg"/></li>
			<li><img title = "Witness Name" src="https://www.newton.ac.uk/files/covers/968361.jpg"/></li>
			`;
		let haha = `
			<li><img title = "Witness Name" src="https://www.newton.ac.uk/files/covers/968361.jpg"/></li>
			<li><img title = "Witness Name" src="https://www.newton.ac.uk/files/covers/968361.jpg"/></li>
			`;
		content = this.addContent(content,haha);

		elScrollbar.append("<ul>" + content + "</ul>");
    }
		
	addContent(content,haha){
		return content.concat(haha);
	}
}