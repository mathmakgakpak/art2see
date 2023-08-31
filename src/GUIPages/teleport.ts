import Page from "../GUIPage";
import { addTextBeforeElement, mkHTML } from "../utils";
import InteractivePositionElement from "../elements/InteractivePosition";
import { farTeleport } from "../OWOP/utils";
import WindowsManager from "../WindowsManager";

class TeleportPage extends Page {
        position = new InteractivePositionElement()
        teleportButton = mkHTML("button", {
            textContent: "Teleport!"
        });
        delay: HTMLInputElement
    constructor(windowsManager: WindowsManager) {
        super(windowsManager, "Teleport");

        this.pageElement.classList.add("teleport-page");
        
        this.teleportButton.addEventListener("click", async () => {
            this.teleportButton.disabled = this.position.disabled = true;
            
            await farTeleport(this.position.x, this.position.y, +this.delay.value || undefined);

            this.teleportButton.disabled = this.position.disabled = false;
        });
        
        this.delay = mkHTML("input", {
            type: "number",
            value: "200",
            min: "50"
        });
        const delayContainer = addTextBeforeElement("Delay: ", this.delay) 

        this.pageElement.append(this.position.element, this.teleportButton, delayContainer);
    }
}

export default TeleportPage;