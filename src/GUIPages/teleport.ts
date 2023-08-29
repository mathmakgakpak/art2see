import Page from "../GUIPage";
import { mkHTML } from "../utils";
import InteractivePositionElement from "../elements/InteractivePosition";
import { farTeleport } from "../OWOP/utils";

class TeleportPage extends Page {
        position = new InteractivePositionElement()
        teleportButton = mkHTML("button", {
            textContent: "Teleport!"
        });
        delay: HTMLInputElement
    constructor() {
        super("Teleport");
        this.pageElement.classList.add("teleport-page");
        
        this.teleportButton.addEventListener("click", async () => {
            this.teleportButton.disabled = this.position.disabled = true;
            
            await farTeleport(this.position.x, this.position.y, +this.delay.value || undefined);

            this.teleportButton.disabled = this.position.disabled = false;
        });
        const delayWrapper = mkHTML("div", {
            className: "delay-wrapper"
        });
        const delayText = mkHTML("span", {
            textContent: "Delay: "
        });
        this.delay = mkHTML("input", {
            type: "number",
            value: "200",
            min: "50"
        });
        delayWrapper.append(delayText, this.delay);

        this.pageElement.append(this.position.element, this.teleportButton, delayWrapper);
    }
}

export default TeleportPage;