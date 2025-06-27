// 生成题目的函数
function generateProblems() {
    const operation = document.getElementById('operation').value;
    const difficulty = document.getElementById('difficulty').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    let problems = '';
    for (let i = 0; i < quantity; i++) {
        let num1, num2;
        if (difficulty === 'easy') {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        } else if (difficulty ==='medium') {
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
        } else {
            num1 = Math.floor(Math.random() * 1000) + 1;
            num2 = Math.floor(Math.random() * 1000) + 1;
        }

        let problem;
        let answer;
        if (operation === 'add') {
            problem = `${num1} + ${num2} = ______`;
            answer = num1 + num2;
        } else if (operation ==='subtract') {
            problem = `${num1} - ${num2} = ______`;
            answer = num1 - num2;
        } else if (operation ==='multiply') {
            problem = `${num1} × ${num2} = ______`;
            answer = num1 * num2;
        } else {
            // 确保除法结果为整数
            do {
                num2 = Math.floor(Math.random() * num1) + 1;
            } while (num1 % num2!== 0);
            problem = `${num1} ÷ ${num2} = ______`;
            answer = num1 / num2;
        }

        problems += `<div class="math-problem">${problem}<span class="answer">(${answer})</span></div>`;
    }

    document.getElementById('mathProblems').innerHTML = problems;
}

// 页面加载时自动生成题目
window.addEventListener('load', generateProblems);

// 生成题目按钮点击事件
const generateProblemsBtn = document.getElementById('generateProblemsBtn');
generateProblemsBtn.addEventListener('click', function () {
    generateProblems();
});

// 显示答案按钮事件
const showAnswersBtn = document.getElementById('showAnswersBtn');
showAnswersBtn.addEventListener('click', function () {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.style.display = answer.style.display === 'inline'? 'none' : 'inline';
    });
    this.textContent = this.textContent === '隐藏答案'? '显示答案' : '显示答案';
});

// 打印答案按钮事件
const printAnswersButton = document.getElementById('printAnswers');
printAnswersButton.addEventListener('click', function () {
    // 创建打印样式元素
    const printStyle = document.createElement('style');
    printStyle.id = 'print-style';
    printStyle.textContent = `
        @media print {
            /* 隐藏不需要打印的元素 */
           .form-row, .button-group, h1 {
                display: none;
            }

            /* 设置页面边距和字体 */
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 1.5cm;
                line-height: 1.6;
            }

           .container {
                box-shadow: none;
            }

            /* 页眉样式 */
            body::before {
                content: "随机数学题集";
                display: block;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #333;
                margin-bottom: 1.5cm;
                border-bottom: 1px solid #ccc;
                padding-bottom: 0.5cm;
            }

            /* 题目样式 */
           .math-problem {
                border: 1px solid #ccc;
                padding: 1rem;
                box-sizing: border-box;
                margin: 0.5rem; /* 为题目添加间距 */
                border-radius: 0.25rem;
                width: calc(33.3333% - 1rem); /* 每个题目宽度减去左右外边距总和 */
                float: left; /* 使题目元素左浮动，实现横向排列 */
                page-break-inside: avoid; /* 避免题目跨页显示 */
            }

            /* 清除浮动 */
           .clearfix::after {
                content: "";
                clear: both;
                display: table;
            }
        }
    `;
    // 将打印样式添加到文档头部
    document.head.appendChild(printStyle);

    // 调用打印方法
    window.print();

    // 打印完成后移除打印样式
    document.head.removeChild(printStyle);
});