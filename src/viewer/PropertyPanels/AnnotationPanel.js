import {Utils} from "../../utils.js";

export class AnnotationPanel{

    constructor(viewer, annotation, propertiesPanel) {
        this.viewer = viewer;
        this.annotation = annotation;
        this.propertiesPanel = propertiesPanel;

        this._update = () => { this.update(); };

        let copyIconPath = Potree.resourcePath + '/icons/copy.svg';
        let removeIconPath = Potree.resourcePath + '/icons/remove.svg';

        this.elContent = $(`
		<div class="propertypanel_content">
			<table class = "annotationTableContainer">
				<tr>
					<th colspan="3">Annotation Position</th>
					<th></th>
				</tr>
				<tr>
					<td align="center" id="annotation_position_x" style="width: 25%"></td>
					<td align="center" id="annotation_position_y" style="width: 25%"></td>
					<td align="center" id="annotation_position_z" style="width: 25%"></td>
					<td align="right" id="copy_camera_position" style="width: 25%">
						<img name="copyAnnotationPosition" title="copy" class="button-icon" src="${copyIconPath}" style="width: 16px; height: 16px"/>
					</td>
				</tr>
				<tr>
					<th colspan="3">Camera Position</th>
					<th></th>
				</tr>
				<tr>
					<td align="center" id="camera_position_x" style="width: 25%"></td>
					<td align="center" id="camera_position_y" style="width: 25%"></td>
					<td align="center" id="camera_position_z" style="width: 25%"></td>
					<td align="right" id="copy_camera_position" style="width: 25%">
						<img name="copyCameraPosition" title="copy" class="button-icon" src="${copyIconPath}" style="width: 16px; height: 16px"/>
					</td>
				</tr>
				<tr>
					<th colspan="3">Camera Target</th>
					<th></th>
				</tr>
				<tr>
					<td align="center" id="camera_target_x" style="width: 25%"></td>
					<td align="center" id="camera_target_y" style="width: 25%"></td>
					<td align="center" id="camera_target_z" style="width: 25%"></td>
					<td align="right" id="copy_camera_target" style="width: 25%">
						<img name="copyCameraTarget" title="copy" class="button-icon" src="${copyIconPath}" style="width: 16px; height: 16px"/>
					</td>
				</tr>

			</table>
                <img name="annotationRemove" class="button-icon" src="${removeIconPath}" style="text-align:right;width: 16px; height: 16px"/>
             <br/> <button id="annotationEdit" class="centerStyle" type="button">Edit</button> 
		</div>
		`);
		if (!viewer.restrict){
        	let elAnnotationEdit = this.elContent.find("[id=annotationEdit]");
        	elAnnotationEdit.click(() => viewer.scene.editAnnotation(this.annotation));
			if (this.annotation != null) {
				this.elAnnotationRemove = this.elContent.find("img[name=annotationRemove]");
				this.elAnnotationRemove.click(() => this.viewer.scene.removeAnnotation(this.annotation));
				
				this.propertiesPanel.addVolatileListener(this.annotation, "annotation_added", this._update);
				this.propertiesPanel.addVolatileListener(this.annotation, "annotation_removed", this._update);
        	}
		}

        this.update();
    }

    update() {
        console.log("Updating Annotation panel");

        if (this.annotation != null) {
            //Annotation Position Show and Copy
            let annotationPos = this.annotation.position.toArray();
            let annotationPosX = parseFloat(annotationPos[0]).toFixed(4);
            let annotationPosY = parseFloat(annotationPos[1]).toFixed(4);
            let annotationPosZ = parseFloat(annotationPos[2]).toFixed(4);

            this.elContent.find("#annotation_position_x").html(annotationPosX);
            this.elContent.find("#annotation_position_y").html(annotationPosY);
            this.elContent.find("#annotation_position_z").html(annotationPosZ);

            let elCopyAnnotationPosition = this.elContent.find("img[name=copyAnnotationPosition]");
            elCopyAnnotationPosition.click(() => {
                let msg = [annotationPosX, annotationPosY, annotationPosZ];
                Utils.clipboardCopy(msg);

                this.viewer.postMessage(
                    `Copied value to clipboard: <br>'${msg}'`,
                    { duration: 3000 });
            });
            if (this.annotation.cameraPosition && this.annotation.cameraTarget) {
                //Camera Position Show and Copy
                let cameraPosition = this.annotation.cameraPosition.toArray();
                let cameraPositionX = parseFloat(cameraPosition[0]).toFixed(4);
                let cameraPositionY = parseFloat(cameraPosition[1]).toFixed(4);
                let cameraPositionZ = parseFloat(cameraPosition[2]).toFixed(4);

                this.elContent.find("#camera_position_x").html(cameraPositionX);
                this.elContent.find("#camera_position_y").html(cameraPositionY);
                this.elContent.find("#camera_position_z").html(cameraPositionZ);

                let elCopyAnnotationCameraPosition = this.elContent.find("img[name=copyCameraPosition]");
                elCopyAnnotationCameraPosition.click(() => {
                    let msg = [cameraPositionX, cameraPositionY, cameraPositionZ];
                    Utils.clipboardCopy(msg);

                    this.viewer.postMessage(
                        `Copied value to clipboard: <br>'${msg}'`,
                        { duration: 3000 });
                });

                //Camera Target Show and Copy
                let cameraTarget = this.annotation.cameraTarget.toArray();
                let cameraTargetX = parseFloat(cameraTarget[0]).toFixed(4);
                let cameraTargetY = parseFloat(cameraTarget[1]).toFixed(4);
                let cameraTargetZ = parseFloat(cameraTarget[2]).toFixed(4);

                this.elContent.find("#camera_target_x").html(cameraTargetX);
                this.elContent.find("#camera_target_y").html(cameraTargetY);
                this.elContent.find("#camera_target_z").html(cameraTargetZ);

                let elCopyAnnotationCameraTarget = this.elContent.find("img[name=copyCameraTarget]");
                elCopyAnnotationCameraTarget.click(() => {
                    let msg = [cameraTargetX, cameraTargetY, cameraTargetZ];
                    Utils.clipboardCopy(msg);

                    this.viewer.postMessage(
                        `Copied value to clipboard: <br>'${msg}'`,
                        { duration: 3000 });
                });
            }
        }
        else {
            let tableContainer = this.elContent.find('.annotationTableContainer');
            tableContainer.empty();
        }
    }
}