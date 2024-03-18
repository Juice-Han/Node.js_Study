const readline = require("readline");

function 가위바위보() {
    // 1 : 가위, 2 : 바위, 3 : 보 의미
    const opponent = Math.floor(Math.random() * 3 + 1); // 랜덤으로 1~3 숫자를 생성하여 상대방(컴퓨터)의 가위바위보 상태 설정(가위 : 1, 바위 : 2, 보 : 3)
    console.log('가위바위보를 시작합니다. 가위, 바위, 보 중에서 하나를 선택하세요.')
    const rl = readline.createInterface({ // 콘솔창을 통해 가위, 바위, 보를 입력 받음
        input: process.stdin,
        output: process.stdout,
    });
    rl.on('line', (line) => { // 한 줄을 입력받을 때마다 실행되는 함수
        let my = 0; // 내 가위바위보 상태 변수 생성
        
        if (line === '가위') my = 1; // 입력받은 가위, 바위, 보에 따라 숫자로 상태 설정(가위 : 1, 바위 : 2, 보 : 3)
        else if (line == '바위') my = 2; 
        else my = 3;

        if(opponent === 1) console.log('컴퓨터 : 가위'); // 랜덤으로 설정된 상대방 가위바위보 상태 콘솔창에 표시해주기
        else if(opponent === 2) console.log('컴퓨터 : 바위');
        else console.log('컴퓨터 : 보');

        if (my === opponent) { // 나와 상대방이 같으면 비겼다고 콘솔창에 출력
            console.log('비겼습니다.');
        } else if (Math.abs(my - opponent) === 1) { // 나와 상대방의 가위바위보 차이가 1 이라면 숫자가 큰 사람이 승리
            if (my > opponent) { // ex) 나 : 2(바위), 상대방 : 1(가위)
                console.log('승리!');
            } else {
                console.log('패배..');
            }
        } else { // 나와 상대방의 가위바위보 차이가 2 이라면 차이가 1일때와 반대로 숫자가 작은 사람이 승리
            if (my > opponent) { // ex) 나 : 1(가위), 상대방 : 3(보)
                console.log('패배..');
            } else {
                console.log('승리!');
            }
        }
        rl.close(); // 입력받기 종료
    })
}

가위바위보(); // 만들어 놓은 가위바위보 함수 실행
