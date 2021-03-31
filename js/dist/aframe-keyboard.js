!function (e) {
    var t = {};

    function a(d) {
        if (t[d]) return t[d].exports;
        var n = t[d] = {i: d, l: !1, exports: {}};
        return e[d].call(n.exports, n, n.exports, a), n.l = !0, n.exports
    }

    a.m = e, a.c = t, a.d = function (e, t, d) {
        a.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: d})
    }, a.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, a.t = function (e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var d = Object.create(null);
        if (a.r(d), Object.defineProperty(d, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var n in e) a.d(d, n, function (t) {
            return e[t]
        }.bind(null, n));
        return d
    }, a.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a.p = "", a(a.s = 0)
}([function (e, t, a) {
    a(1), a(3);
    const d = a(4), n = {mode: "normal"};
    n.template = new d, e.exports = window.AFK = n
}, function (e, t, a) {
    const d = a(2);
    if ("undefined" == typeof AFRAME) throw new Error("Component attempted to register before AFRAME was available.");
    AFRAME.registerComponent("a-keyboard", {
        schema: {
            audio: {default: !1},
            color: {default: "#fff"},
            highlightColor: {default: "#1a79dc"},
            dismissable: {default: !0},
            font: {default: "monoid"},
            fontSize: {default: "0.025"},
            locale: {default: "en"},
            model: {default: ""},
            baseTexture: {default: ""},
            keyTexture: {default: ""},
            verticalAlign: {default: "center"}
        }, init: function () {
            AFK.template.draw({...this.data, el: this.el}), this.attachEventListeners()
        }, attachEventListeners: function () {
            window.addEventListener("keydown", this.handleKeyboardPress), this.el.addEventListener("click", this.handleKeyboardVR)
        }, removeEventListeners: function () {
            window.removeEventListener("keydown", this.handleKeyboardPress), this.el.removeEventListener("click", this.handleKeyboardVR)
        }, handleKeyboardPress: function (e) {

            //TODO
            if (window.location.hash === "#login") {
                d(e)
            }

        }, handleKeyboardVR: function (e) {

            //todo
            let value = e.target.getAttribute('value');

            if (value === '<-') {
                let i = 0;
                let doListen = true;
                e.target.addEventListener('mouseleave', () => {
                   doListen = false;
                })

                d(e, "vr");
                let intr = setInterval(function() {
                    if (++i === 1000 || doListen === false) clearInterval(intr);
                    if (doListen === true) d(e, "vr");
                }, 1000)
            }

           else d(e, "vr")
        }, remove: function () {
            this.removeEventListeners()
        }
    })
}, function (e, t) {
    e.exports = function (e, t) {
        let a;
        const d = new Set([16, 17, 18, 20, 33, 34, 35, 36, 45, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]),
            n = e.key && e.key.charCodeAt(0);
        let r = e.key, s = e.keyCode;
        if ("vr" === t) s = parseInt(document.querySelector(`#${e.target.id}`).getAttribute("key-code")), r = document.querySelector(`#${e.target.id}`).getAttribute("value"); else if (d.has(e.keyCode)) return;
        switch (s) {
            case 9:
                a = new CustomEvent("a-keyboard-update", {detail: {code: s, value: "\t"}}), document.dispatchEvent(a);
                break;
            case 8:
                a = new CustomEvent("a-keyboard-update", {detail: {code: s, value: ""}}), document.dispatchEvent(a);
                break;
            case 13:
                a = new CustomEvent("a-keyboard-update", {detail: {code: s, value: "\n"}}), document.dispatchEvent(a);
                break;
            case 16:
                AFK.template.toggleActiveMode("shift");
                break;
            case 18:
                AFK.template.toggleActiveMode("alt");
                break;
            case 27:
                this.dismissable && (a = new CustomEvent("a-keyboard-update", {
                    detail: {
                        code: s,
                        value: ""
                    }
                }), document.dispatchEvent(a));
                break;
            case 32:
                a = new CustomEvent("a-keyboard-update", {detail: {code: s, value: " "}}), document.dispatchEvent(a);
                break;
            default:
                a = new CustomEvent("a-keyboard-update", {detail: {code: s, value: r}}), document.dispatchEvent(a)
        }
        if ("vr" !== t) {
            const t = document.querySelector(`#a-keyboard-${n}`) || document.querySelector(`#a-keyboard-${e.keyCode}`);
            t && (t.dispatchEvent(new Event("mousedown")), setTimeout((function () {
                t.dispatchEvent(new Event("mouseleave"))
            }), 80))
        }
    }
}, function (e, t) {
    if ("undefined" == typeof AFRAME) throw new Error("Component attempted to register before AFRAME was available.");
    AFRAME.registerComponent("keyboard-button", {
        init: function () {
            const el = this.el;
            el.addEventListener('mousedown', function() {
              el.setAttribute('material', 'opacity', '0.7');
            });
        
            el.addEventListener('mouseup', () => {
              el.setAttribute('material', 'opacity', this.isMouseEnter ? '0.9' : '0');
            });
        
            el.addEventListener('mouseenter', () => {
              el.setAttribute('material', 'opacity', '0.3');
              self.isMouseEnter = true;
            });
        
            el.addEventListener('mouseleave', () => {
              el.setAttribute('material', 'opacity', '0.9');
              self.isMouseEnter = false;
            })
        }
    })
}, function (e, t, a) {
    const d = a(5);
    e.exports = class {
        constructor() {
            this.keyboardKeys = {}, this.activeMode = "normal"
        }

        draw(e) {
            for (const t in e) this[t] = e[t];
            this.keyboardKeys = d(e.locale), this.drawKeyboard()
        }

        drawButton(e) {
            const t = e.key, a = t.size.split(" ")[0], d = t.size.split(" ")[1], n = document.createElement("a-entity");
            n.setAttribute("position", e.position);
            const r = document.createElement("a-entity");
            r.setAttribute("geometry", `primitive: plane; width: ${a}; height: ${d};`), this.keyTexture && this.keyTexture.length > 0 ? r.setAttribute("material", `src: ${this.keyTexture}`) : r.setAttribute("material", "color: #4a4a4a; opacity: 0.9");
            r.setAttribute("keyboard-button", !0),
                r.setAttribute("value", t.value),
                r.setAttribute("class", "collidable"),
                r.id = `a-keyboard-${t.code}`,
                r.setAttribute("key-code", t.code);

            const s = document.createElement("a-troika-text");

            s.setAttribute("value", t.value),
                s.setAttribute("align", "center"),
                s.setAttribute("baseline", this.verticalAlign),
                s.setAttribute("position", "0 0 0.001"),
                s.setAttribute("max-width", this.fontSize),
                s.setAttribute("font-size", this.fontSize),
                //r.setAttribute("geometry", `primitive: plane; width: ${a}; height: ${d}`),
                //s.setAttribute("material", `opacity: 0.0; transparent: true; color: ${this.highlightColor}`),
                s.setAttribute("color", this.color),
                s.setAttribute("font", this.font),
                s.setAttribute("shader", "msdf"),
                s.setAttribute("negate", "false"),
                n.appendChild(r), n.appendChild(s), this.el.appendChild(n)
        }

        drawKeyboard() {
            for (; this.el.firstChild;) this.el.removeChild(this.el.firstChild);
            if (this.keyboardKeys) {
                const e = this.keyboardKeys[this.activeMode] || this.keyboardKeys.normal,
                    t = document.createElement("a-entity"), a = .52, d = .04 * e.length + .004 * (e.length - 1) + .04;
                t.setAttribute("position", `${a / 2 - .02} ${-d / 2 + .02} -0.01`), t.setAttribute("geometry", `primitive: plane; width: ${a}; height: ${d}`), this.baseTexture && this.baseTexture.length > 0 ? t.setAttribute("material", `src: ${this.baseTexture}`) : t.setAttribute("material", "color: #4a4a4a; side: double; opacity: 0.7"), this.el.appendChild(t);
                let n = 0;
                for (let t = 0; t < e.length; t++) {
                    const a = e[t];
                    let d = 0;
                    for (let e = 0; e < a.length; e++) {
                        const t = a[e], r = this.parseKeyObjects(t);
                        if (!this.dismissable && "reset" === t.type) continue;
                        const s = r.size.split(" ")[0], l = r.size.split(" ")[1];
                        this.drawButton({
                            key: r,
                            position: `${d + s / 2} ${n - l / 2} 0`
                        }), d += parseFloat(s) + .004, a.length === e + 1 && (n -= .044)
                    }
                }
            }
        }

        toggleActiveMode(e) {
            e === this.activeMode ? (this.activeMode = "normal", this.drawKeyboard()) : (this.activeMode = e, this.drawKeyboard())
        }

        parseKeyObjects(e) {
            const t = e.type, a = e.value;
            switch (t) {
                case"delete":
                    return {size: "0.04 0.04 0", value: a, code: "8"};
                case"enter":
                    return {size: "0.04 0.084 0", value: a, code: "13"};
                case"shift":
                    return {size: "0.084 0.04 0", value: a, code: "16"};
                case"alt":
                    return {size: "0.084 0.04 0", value: a, code: "18"};
                case"space":
                    return {size: `${.2 + .016} 0.04 0`, value: a, code: "32"};
                case"reset":
                    return {size: "0.084 0.04 0", value: a, code: "24"};
                case"submit":
                    return {size: "0.084 0.04 0", value: a, code: "06"};
                default:
                    return {size: "0.04 0.04 0", value: a, code: a.charCodeAt(0)}
            }
        }
    }
}, function (e, t, a) {
    const d = a(6);
    e.exports = function (e) {
        switch (e) {
            case"en":
            default:
                return d
        }
    }
}, function (e, t) {
    e.exports = {
        name: "ms-US-International",
        normal: [[{value: "1", type: "standard"}, {value: "2", type: "standard"}, {
            value: "3",
            type: "standard"
        }, {value: "4", type: "standard"}, {value: "5", type: "standard"}, {value: "6", type: "standard"}, {
            value: "7",
            type: "standard"
        }, {value: "8", type: "standard"}, {value: "9", type: "standard"}, {value: "0", type: "standard"}, {
            value: "<-",
            type: "delete"
        }], [{value: "q", type: "standard"}, {value: "w", type: "standard"}, {
            value: "e",
            type: "standard"
        }, {value: "r", type: "standard"}, {value: "t", type: "standard"}, {value: "y", type: "standard"}, {
            value: "u",
            type: "standard"
        }, {value: "i", type: "standard"}, {value: "o", type: "standard"}, {
            value: "p",
            type: "standard"
        }, {value: "Ent", type: "enter"}], [{value: "a", type: "standard"}, {value: "s", type: "standard"}, {
            value: "d",
            type: "standard"
        }, {value: "f", type: "standard"}, {value: "g", type: "standard"}, {value: "h", type: "standard"}, {
            value: "j",
            type: "standard"
        }, {value: "k", type: "standard"}, {value: "l", type: "standard"}, {
            value: '"',
            type: "standard"
        }], [{value: "Shift", type: "shift"}, {value: "z", type: "standard"}, {
            value: "x",
            type: "standard"
        }, {value: "c", type: "standard"}, {value: "v", type: "standard"}, {value: "b", type: "standard"}, {
            value: "n",
            type: "standard"
        }, {value: "m", type: "standard"}, {value: "Alt", type: "alt"}], [{value: "Reset", type: "reset"}, {
            value: "",
            type: "space"
        }, {value: ",", type: "standard"}, {value: ".", type: "standard"}, {value: "Submit", type: "submit"}]],
        shift: [[{value: "1", type: "standard"}, {value: "2", type: "standard"}, {
            value: "3",
            type: "standard"
        }, {value: "4", type: "standard"}, {value: "5", type: "standard"}, {value: "6", type: "standard"}, {
            value: "7",
            type: "standard"
        }, {value: "8", type: "standard"}, {value: "9", type: "standard"}, {value: "0", type: "standard"}, {
            value: "<-",
            type: "delete"
        }], [{value: "Q", type: "standard"}, {value: "W", type: "standard"}, {
            value: "E",
            type: "standard"
        }, {value: "R", type: "standard"}, {value: "T", type: "standard"}, {value: "Y", type: "standard"}, {
            value: "U",
            type: "standard"
        }, {value: "I", type: "standard"}, {value: "O", type: "standard"}, {
            value: "P",
            type: "standard"
        }, {value: "Ent", type: "enter"}], [{value: "A", type: "standard"}, {value: "S", type: "standard"}, {
            value: "D",
            type: "standard"
        }, {value: "F", type: "standard"}, {value: "G", type: "standard"}, {value: "H", type: "standard"}, {
            value: "J",
            type: "standard"
        }, {value: "K", type: "standard"}, {value: "L", type: "standard"}, {
            value: '"',
            type: "standard"
        }], [{value: "Shift", type: "shift"}, {value: "Z", type: "standard"}, {
            value: "X",
            type: "standard"
        }, {value: "C", type: "standard"}, {value: "V", type: "standard"}, {value: "B", type: "standard"}, {
            value: "N",
            type: "standard"
        }, {value: "M", type: "standard"}, {value: "Alt", type: "alt"}], [{value: "Reset", type: "reset"}, {
            value: "",
            type: "space"
        }, {value: ",", type: "standard"}, {value: ".", type: "standard"}, {value: "Submit", type: "submit"}]],
        alt: [[{value: "1", type: "standard"}, {value: "2", type: "standard"}, {
            value: "3",
            type: "standard"
        }, {value: "4", type: "standard"}, {value: "5", type: "standard"}, {value: "6", type: "standard"}, {
            value: "7",
            type: "standard"
        }, {value: "8", type: "standard"}, {value: "9", type: "standard"}, {value: "0", type: "standard"}, {
            value: "<-",
            type: "delete"
        }], [{value: "~", type: "standard"}, {value: "`", type: "standard"}, {
            value: "|",
            type: "standard"
        }, {value: "(", type: "standard"}, {value: ")", type: "standard"}, {value: "^", type: "standard"}, {
            value: "_",
            type: "standard"
        }, {value: "-", type: "standard"}, {value: "=", type: "standard"}, {
            value: "!",
            type: "standard"
        }, {value: "Ent", type: "enter"}], [{value: "@", type: "standard"}, {value: "#", type: "standard"}, {
            value: "$",
            type: "standard"
        }, {value: "%", type: "standard"}, {value: "*", type: "standard"}, {value: "[", type: "standard"}, {
            value: "]",
            type: "standard"
        }, {value: "#", type: "standard"}, {value: "<", type: "standard"}, {
            value: "?",
            type: "standard"
        }], [{value: "Shift", type: "shift"}, {value: ":", type: "standard"}, {
            value: ";",
            type: "standard"
        }, {value: "{", type: "standard"}, {value: "}", type: "standard"}, {value: "/", type: "standard"}, {
            value: "\\",
            type: "standard"
        }, {value: ">", type: "standard"}, {value: "Alt", type: "alt"}], [{value: "Reset", type: "reset"}, {
            value: "",
            type: "space"
        }, {value: ",", type: "standard"}, {value: ".", type: "standard"}, {value: "Submit", type: "submit"}]]
    }
}]);