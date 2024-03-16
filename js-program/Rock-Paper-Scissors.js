const readline = require("readline");



/* // 생성한 rl 변수를 사용하는 법
rl.on("line", (line) => {
    // 한 줄씩 입력받은 후 실행할 코드
    rl.close(); // close가 없으면 입력을 무한히 받는다.
});
rl.on('close', () => {
    // 입력이 끝난 후 실행할 코드
}) */
function 가위바위보() {
    // 1 : 가위, 2 : 바위, 3 : 보 의미
    const opponent = Math.floor(Math.random() * 3 + 1);
    console.log('가위바위보를 시작합니다. 가위, 바위, 보 중에서 하나를 선택하세요.')
    const rl = readline.createInterface({
        // 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
        input: process.stdin,
        output: process.stdout,
    });
    rl.on('line', (line) => {
        let my = 0;
        
        if (line === '가위') my = 1; 
        else if (line == '바위') my = 2; 
        else my = 3;

        if(opponent === 1) console.log('컴퓨터 : 가위');
        else if(opponent === 2) console.log('컴퓨터 : 바위');
        else console.log('컴퓨터 : 보');

        if (my === opponent) {
            console.log('비겼습니다.');
        } else if (Math.abs(my - opponent) === 1) {
            if (my > opponent) {
                console.log('승리!');
            } else {
                console.log('패배..');
            }
        } else {
            if (my > opponent) {
                console.log('패배..');
            } else {
                console.log('승리!');
            }
        }
        rl.close();
    })
}

가위바위보();