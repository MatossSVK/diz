//komponent pohyb pohladom na sipky
AFRAME.registerComponent('mobile-movement', {
    init: function () {
        if (AFRAME.utils.device.isMobile() === true) {
            let camera = document.getElementById('cameraWrapper');

            setTimeout(function () {
                if (camera["wasd-controls"] === undefined) {
                    camera.setAttribute("wasd-controls", "true");
                }
            }, 500);


            this.el.addEventListener('mouseleave', () => {
                let el = this.el;
                camera.components["wasd-controls"].keys["ArrowUp"] = false;
                el.setAttribute('src', '#imgArrow');
            });

            this.el.addEventListener("click", () => {
                let el = this.el;
                camera.components["wasd-controls"].keys["ArrowUp"] = true;
                el.setAttribute('src', '#imgArrowActvie');
            })
        } else this.el.setAttribute('visible', false);
    },
    tick: function () {
        if (AFRAME.utils.device.isMobile() === true) {
            let camera = document.getElementById('cameraWrapper');
            let worldPos = new THREE.Vector3();
            worldPos.setFromMatrixPosition(camera.object3D.matrixWorld);

            if (this.el.id === 'arrow1') {
                this.el.setAttribute('position', `${worldPos.x + 1.5} ${0.01} ${worldPos.z}`);
            } else if (this.el.id === 'arrow2') {
                this.el.setAttribute('position', `${worldPos.x} ${0.01} ${worldPos.z - 1.5}`);
            } else if (this.el.id === 'arrow3') {
                this.el.setAttribute('position', `${worldPos.x - 1.5} ${0.01} ${worldPos.z}`);
            } else if (this.el.id === 'arrow4') {
                this.el.setAttribute('position', `${worldPos.x} ${0.01} ${worldPos.z + 1.5}`);
            }
        }
    }
});

//SLIDER component for dragging
let dragging = false;
AFRAME.registerComponent("drag", {
    init: function () {
        let el = this.el;
        let _this = this;

        this.el.addEventListener('click', function (evt) {
            dragging = true;
        })

        this.el.addEventListener('raycaster-intersected', function (evt) {
            _this.raycaster = evt.detail.el;
        });
        this.el.addEventListener('raycaster-intersected-cleared', function (evt) {
            _this.raycaster = null;
            dragging = false;
        });

    },
    tick: function tick() {
        let el = this.el;
        let form = el.parentElement;
        if (form.getAttribute('visible') === true) {
            if (!this.raycaster) {
                return;
            }
            let intersection = this.raycaster.components.raycaster.getIntersection(el);
            if (!intersection) {

            } else if (dragging) {
                let event = new CustomEvent("drag", {
                    detail: {
                        intersection: intersection
                    }
                });
                el.dispatchEvent(event);
            }
        }
    }

});


//otvorenie formulara objektu zariadenia
AFRAME.registerComponent("collidable", {
    init: function () {
        const e = this.el;
        const color = e.getAttribute('color');
        e.addEventListener("mouseenter", () => {
            //e.setAttribute('material', `metalness: 0.6; color: ${color}`);

        })

        e.addEventListener("mouseleave", () => {
            //  e.setAttribute('material', `metalness: 0; color: ${color}`);
        })

        e.addEventListener("click", () => {
            openForm(e.id);
        })
    }
})

//otvorenie formulara objektu zariadenia
AFRAME.registerComponent("weather", {
    init: function () {
        const el = this.el;
        let date = new Date();
        if (date.getHours() <= 17 && date.getHours() >= 6) el.setAttribute('color', '#87ceeb');

        el.addEventListener("click", () => {
            if (el.id !== 'doorWeather' && !document.getElementById('weather' + el.parentElement.getAttribute('position').x + el.parentElement.getAttribute('position').z)) {
                let container = document.createElement('a-gui-label');
                container.id = 'weather' + el.parentElement.getAttribute('position').x + el.parentElement.getAttribute('position').z;
                if (el.parentElement.getAttribute('class') === 'double') container.setAttribute('position', '0.5 1.1 0');
                else if (el.id === 'kitchenWin') container.setAttribute('position', '0 1.1 0.15');
                else container.setAttribute('position', '0 1.1 0');
                createWeather(container);
                el.parentElement.appendChild(container);
            }
        })
    }
})

function createWeather(container) {
    container.setAttribute('width', '2.4');
    container.setAttribute('font-size', '55px');
    container.setAttribute('height', '1.6');
    container.setAttribute('background-color', 'white');
    container.setAttribute('font-color', 'white');

    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();

    let title = document.createElement('a-troika-text');
    title.setAttribute('position', '-0.45 0.475 0.001');
    title.setAttribute('color', '#0E53A7');
    title.setAttribute('align', 'center');
    title.setAttribute('font-size', '0.15');
    title.setAttribute('font', "assets/fonts/font.ttf");
    title.setAttribute('value', "Ahoj " + currentName + "!");
    title.setAttribute('max-width', '0.5');
    container.appendChild(title);

    let title2 = document.createElement('a-troika-text');
    title2.setAttribute('position', '0.46 0.52 0.005');
    title2.setAttribute('color', '#0E53A7');
    title2.setAttribute('align', 'center');
    title2.setAttribute('font-size', '0.1');
    title2.setAttribute('value', day + '.' + month + '.' + year);
    container.appendChild(title2);

    let title3 = document.createElement('a-troika-text');
    title3.setAttribute('position', '0.45 0.41 0.002');
    title3.setAttribute('color', '#0E53A7');
    title3.setAttribute('align', 'center');
    title3.setAttribute('font-size', '0.1');
    setInterval(function () {
        let d = new Date();
        let mins = d.getMinutes();
        mins = mins < 10 ? '0' + mins : mins;
        title3.setAttribute('value', d.getHours() + ":" + mins);
    }, 1000);
    container.appendChild(title3);

    let title4 = document.createElement('a-troika-text');
    title4.setAttribute('position', '-0.7 0.05 0.001');
    title4.setAttribute('color', '#0E53A7');
    title4.setAttribute('align', 'center');
    title4.setAttribute('font-size', '0.125');
    title4.setAttribute('value', "Košice, Slovensko");
    title4.setAttribute('max-width', '0.5');
    title4.setAttribute('font', "assets/fonts/font.ttf");
    title4.setAttribute('negate', 'false');
    container.appendChild(title4);

    let borderTopEntity = document.createElement("a-entity");
    borderTopEntity.setAttribute('geometry', 'primitive: box; width: ' + 2.4 + '; height: 0.01; depth: 0.02;');
    borderTopEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + '#0E53A7');
    borderTopEntity.setAttribute('position', '0 -' + (1.6 / 2 - 0.005) + ' 0.01');
    container.appendChild(borderTopEntity);
    let borderBottomEntity = document.createElement("a-entity");
    borderBottomEntity.setAttribute('geometry', 'primitive: box; width: ' + 2.4 + '; height: 0.01; depth: 0.02;');
    borderBottomEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + '#0E53A7');
    borderBottomEntity.setAttribute('position', '0 ' + (1.6 / 2 - 0.005) + ' 0.01');
    container.appendChild(borderBottomEntity);
    let borderLeftEntity = document.createElement("a-entity");
    borderLeftEntity.setAttribute('geometry', 'primitive: box; width: 0.01; height: ' + 1.6 + '; depth: 0.02;');
    borderLeftEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + '#0E53A7');
    borderLeftEntity.setAttribute('position', '-' + (2.4 / 2 - 0.005) + ' 0 0.01');
    container.appendChild(borderLeftEntity);
    let borderRightEntity = document.createElement("a-entity");
    borderRightEntity.setAttribute('geometry', 'primitive: box; width: 0.01; height: ' + 1.6 + '; depth: 0.02;');
    borderRightEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + '#0E53A7');
    borderRightEntity.setAttribute('position', 2.4 / 2 - 0.005 + ' 0 0.01');
    container.appendChild(borderRightEntity);

    let iconX = document.createElement('a-gui-icon-button');
    iconX.setAttribute('height', "0.15");
    iconX.setAttribute('onclick', "closeWeather('" + container.id + "')");
    iconX.setAttribute('background-color', '#0E53A7');
    iconX.setAttribute('hover-color', 'white');
    iconX.setAttribute('position', '1 0.65 0');
    iconX.setAttribute('icon-font-size', '95px');
    iconX.setAttribute('class', 'clickable');
    iconX.setAttribute('icon', "close-round");
    container.appendChild(iconX);

    let mainImage = document.createElement('a-image');
    mainImage.setAttribute('src', "#sun");
    mainImage.setAttribute('scale', '0.5 0.4 1');
    mainImage.setAttribute('position', '0 0.05 0.01');
    container.appendChild(mainImage);

    let mainTemp = document.createElement('a-troika-text');
    mainTemp.setAttribute('position', '0.7 0.05 0.005');
    mainTemp.setAttribute('color', '#0E53A7');
    mainTemp.setAttribute('align', 'center');
    mainTemp.setAttribute('font-size', '0.15');
    mainTemp.setAttribute('value', '25°C');
    container.appendChild(mainTemp);

    let day1 = new Date();
    day1.setDate(new Date().getDate()+1);
    let day1Label = document.createElement('a-troika-text');
    day1Label.setAttribute('position', '-0.8 -0.275 0.005');
    day1Label.setAttribute('color', '#0E53A7');
    day1Label.setAttribute('align', 'center');
    day1Label.setAttribute('font-size', '0.09');
    day1Label.setAttribute('value', String(day1.getDate()).padStart(2, '0') + '.' + String(day1.getMonth() + 1).padStart(2, '0'));
    container.appendChild(day1Label);

    let day1image = document.createElement('a-image');
    day1image.setAttribute('src', "#snow");
    day1image.setAttribute('scale', '0.36 0.28 1');
    day1image.setAttribute('position', '-0.8 -0.48 0.01');
    container.appendChild(day1image);

    let da1Temp = document.createElement('a-troika-text');
    da1Temp.setAttribute('position', '-0.8 -0.675 0.005');
    da1Temp.setAttribute('color', '#0E53A7');
    da1Temp.setAttribute('align', 'center');
    da1Temp.setAttribute('font-size', '0.1');
    da1Temp.setAttribute('value', '8°C');
    container.appendChild(da1Temp);

    let day2 = new Date();
    day2.setDate(new Date().getDate()+2);
    let day2Label = document.createElement('a-troika-text');
    day2Label.setAttribute('position', '-0.27 -0.275 0.005');
    day2Label.setAttribute('color', '#0E53A7');
    day2Label.setAttribute('align', 'center');
    day2Label.setAttribute('font-size', '0.09');
    day2Label.setAttribute('value', String(day2.getDate()).padStart(2, '0') + '.' + String(day2.getMonth() + 1).padStart(2, '0'));
    container.appendChild(day2Label);

    let day2image = document.createElement('a-image');
    day2image.setAttribute('src', "#storm");
    day2image.setAttribute('scale', '0.36 0.28 1');
    day2image.setAttribute('position', '-0.27 -0.48 0.01');
    container.appendChild(day2image);

    let day2Temp = document.createElement('a-troika-text');
    day2Temp.setAttribute('position', '-0.27 -0.675 0.005');
    day2Temp.setAttribute('color', '#0E53A7');
    day2Temp.setAttribute('align', 'center');
    day2Temp.setAttribute('font-size', '0.1');
    day2Temp.setAttribute('value', '12°C');
    container.appendChild(day2Temp);

    let day3 = new Date();
    day3.setDate(new Date().getDate()+3);
    let day3Label = document.createElement('a-troika-text');
    day3Label.setAttribute('position', '0.27 -0.275 0.005');
    day3Label.setAttribute('color', '#0E53A7');
    day3Label.setAttribute('align', 'center');
    day3Label.setAttribute('font-size', '0.09');
    day3Label.setAttribute('value', String(day3.getDate()).padStart(2, '0') + '.' + String(day3.getMonth() + 1).padStart(2, '0'));
    container.appendChild(day3Label);

    let day3image = document.createElement('a-image');
    day3image.setAttribute('src', "#rain");
    day3image.setAttribute('scale', '0.36 0.28 1');
    day3image.setAttribute('position', '0.27 -0.48 0.01');
    container.appendChild(day3image);

    let day3Temp = document.createElement('a-troika-text');
    day3Temp.setAttribute('position', '0.27 -0.675 0.005');
    day3Temp.setAttribute('color', '#0E53A7');
    day3Temp.setAttribute('align', 'center');
    day3Temp.setAttribute('font-size', '0.1');
    day3Temp.setAttribute('value', '15°C');
    container.appendChild(day3Temp);

    let day4 = new Date();
    day4.setDate(new Date().getDate()+4);
    let day4Label = document.createElement('a-troika-text');
    day4Label.setAttribute('position', '0.8 -0.275 0.005');
    day4Label.setAttribute('color', '#0E53A7');
    day4Label.setAttribute('align', 'center');
    day4Label.setAttribute('font-size', '0.09');
    day4Label.setAttribute('value', String(day4.getDate()).padStart(2, '0') + '.' + String(day4.getMonth() + 1).padStart(2, '0'));
    container.appendChild(day4Label);

    let day4image = document.createElement('a-image');
    day4image.setAttribute('src', "#cloudsun");
    day4image.setAttribute('scale', '0.36 0.28 1');
    day4image.setAttribute('position', '0.8 -0.48 0.01');
    container.appendChild(day4image);

    let day4Temp = document.createElement('a-troika-text');
    day4Temp.setAttribute('position', '0.8 -0.675 0.005');
    day4Temp.setAttribute('color', '#0E53A7');
    day4Temp.setAttribute('align', 'center');
    day4Temp.setAttribute('font-size', '0.1');
    day4Temp.setAttribute('value', '20°C');
    container.appendChild(day4Temp);

}

function closeWeather(id) {
    document.getElementById(id).remove();
}
