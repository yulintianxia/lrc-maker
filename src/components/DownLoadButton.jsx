/**
 * Created by 阿卡琳 on 27/06/2017.
 */
"use strict";
import { action, observable } from "mobx";
import preact, { Component } from "preact";
import { observer } from "preact-mobx-observer";
import { lrc } from "../store/lrc.js";
import { DownloadSvg } from "./SVG.jsx";

@observer
class DownLoadButton extends Component {
    @observable href = false;

    lrcString = "";

    @action.bound
    handleClick() {
        let lrcString = lrc.value;
        if (this.lrcString != lrcString) {
            this.lrcString = lrcString;
            URL.revokeObjectURL(this.href);
            this.href = URL.createObjectURL(new Blob([lrcString], { type: "text/plain;charset=UTF-8" }));
        }
    }

    render() {
        return (
            <a
                className="download iconbutton"
                download={(lrc.info.get("ti") || new Date()) + ".lrc"}
                href={this.href}
                onClick={this.handleClick}
            >
                <DownloadSvg />
            </a>
        );
    }
}

export { DownLoadButton };