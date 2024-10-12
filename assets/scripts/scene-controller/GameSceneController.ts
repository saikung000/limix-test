import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameSceneController")
export class GameSceneController extends Component {
    start() {
        console.log("Open Game Scene")
    }

    update(deltaTime: number) {}

    onClickBackButton() {
        director.loadScene("MainMenu", function () {});
    }
}
