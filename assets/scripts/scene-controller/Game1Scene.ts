import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Game1Scene")
export class Game1Scene extends Component {
    start() {
        console.log("Game1 Scene")
    }

    update(deltaTime: number) {}

    onClickBackButton() {
        director.loadScene("MainMenu", function () {});
    }
}
