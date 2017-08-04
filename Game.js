/**
 * Created by Administrator on 2017/8/4.
 */
(function () {

    function Game() {
        //初始的行数
        var rowNum = 2;
        //游戏的背景图
        var backgroundView;
        var controlBackgroundView;
        var degreeLevel = 3;
        var stepNum = 0;
        var isPlaying = false;
        var level = 0;
        var lastSelectedDegreeLevelView;
        var opacity = 0.5;
        var opacitySpace = 0.1;
        var specialOpacity = function () {
            return opacity-opacitySpace;
        };

        function controlView() {

            controlBackgroundView = document.createElement("div");
            controlBackgroundView.id = "controlBackgroundView";
            document.body.appendChild(controlBackgroundView);

            var levelView = document.createElement("h1");
            levelView.textContent = "等级:0级";
            levelView.id = "levelView";
            controlBackgroundView.appendChild(levelView);

            var degreeList = ["易","中","难"];
            var degreeView = document.createElement("ul");
            controlBackgroundView.appendChild(degreeView);

            for (var i=0;i<degreeList.length;i++){
                var item = document.createElement("li");
                item.textContent = degreeList[i];
                item.id = 100+i;
                item.className = "selectDegree";
                degreeView.appendChild(item);
                if (i===degreeList.length-1){
                    item.id = "selectedDegree";
                    lastSelectedDegreeLevelView = item;
                }
                item.addEventListener("click",function () {

                    if (isPlaying){
                        alert("不可在游戏进行时调节难度");
                        return;
                    }
                    lastSelectedDegreeLevelView.id = null;
                    changeLevel(this);
                    lastSelectedDegreeLevelView = this;
                    finish();
                });
            }

            function changeLevel(item) {
                switch (item.textContent){
                    case "易":
                        degreeLevel = 1;
                        opacity = 1.0;
                        opacitySpace = 0.4;
                        item.id = "selectedDegree";
                        break;
                    case "中":
                        degreeLevel = 2;
                        opacity = 0.8;
                        opacitySpace = 0.2;
                        item.id = "selectedDegree";
                        break;
                    case "难":
                        degreeLevel = 3;
                        opacity = 0.6;
                        opacitySpace = 0.1;
                        item.id = "selectedDegree";
                        break;
                    default:
                }
            }

            var stepView = document.createElement("p");
            stepView.textContent = "步数:0步";
            stepView.id = "stepView";
            controlBackgroundView.appendChild(stepView);

        }

        //创建游戏界面
        function createView() {

            backgroundView = document.createElement("div");
            backgroundView.id = "backgroundView";
            document.body.appendChild(backgroundView);

            // 颜色的数组
            var colors = ["#9E413B","#33539E","#9E1A8D","#259E2D"];
            //随机抽选颜色
            var arcColorIndex = parseInt(Math.random()*100)%colors.length;

            //色块的数量：行数*行数
            var colorViewNum = rowNum*rowNum;

            // 随机的色块标识
            var specialColorViewID = parseInt(Math.random()*10000)%colorViewNum;

            for (var i=0;i<colorViewNum;i++){
                //创建色块
                var colorView = ColorView(rowNum,colors[arcColorIndex],opacity);
                backgroundView.appendChild(colorView);

                //找到特殊的色块 给他一个点击事件
                if (i===specialColorViewID){
                    colorView.style.opacity = specialOpacity();
                    colorView.onclick = function () {
                        success();
                    };
                }else {
                    // 普通色块的点击事件
                    colorView.onclick = function () {
                        failed();
                    };
                }
            }
        }

        //成功
        function success() {
            isPlaying = true;
            stepNum++;
            if (stepNum%5===0){
                level++;
            }
            console.log(stepNum%5);
            // 让行数+1
            switch (degreeLevel){
                case 1:
                    if (stepNum%5===0){
                        rowNum++;
                    }
                    break;
                case 2:
                    if (stepNum%3===0){
                        rowNum++;
                    }
                    break;
                case 3:
                    rowNum++;
                    break;
                default:
            }

            finish();
        }
        //失败
        function failed() {
            isPlaying = false;
            // 让行数重置
            rowNum = 2;
            level = 0;
            stepNum = 0;
            opacity = 0.5;
            opacitySpace = 0.1;
            finish();
        }
        //游戏完成
        function finish() {
            document.getElementById("levelView").textContent = "等级:"+level+"级";
            document.getElementById("stepView").textContent = "步数:"+stepNum+"步";
            // 替换上一个界面
            //移除
            document.body.removeChild(backgroundView);
            //重新加载游戏界面
            createView();
        }

        controlView();
        createView();
    }

    window.Game = Game;
})();