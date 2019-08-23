
export class ItemArea {
	constructor(viewer){
		this.viewer = viewer;

		this.elItemArea = null;
	}

	init () {
		this.elItemArea = $("#potree_itemArea");
		this.elItemArea.draggable({ handle: $('#potree_itemArea_header') });
		this.elItemArea.resizable();
	}

	toggle () {
		if (this.elItemArea.is(':visible')) {
			this.elItemArea.css('display', 'none');
			this.enabled = false;
		} else {
			this.elItemArea.css('display', 'block');
			this.enabled = true;
		}
	}
}