# X나 간지나는 미연이 개발자님 노트.

## React 구조.

return 이라고 하는곳에 html tag를 넣으면 끝!

             import React from 'react';
             import './App.css';
             import FirstPage from './first/FirstPage';

             function App() {
             return (
                <div>
                   안녕
                </div>
             );
             }

             export default App;

## React State

1.  선언방법

          const [abc, setAbc] = useState('화이팅');

    abc 가 state(변수)  
    setAbc 는 state를 변경할수 있는 함수

2.  React에서 State 표시하는 방법

            import React from 'react';
            import './App.css';
            import FirstPage from './first/FirstPage';

            function App() {

            const [abc, setAbc] = useState('화이팅');

            return (
                <div>
                   {abc}
                </div>
            );
            }

            export default App;

3.  State 값을 바꾸는 방법

         setAbc('잘자');

4.  Flux

    > Step1. Action(function)을 일으키고,

    > Step2. State 를 바꾸고(setAbc)

    > Step3. 바뀐 State가 화면에 보여진다.

# 변수

1.  변수 종류

    1. string
    2. number

    3) date
    4) boolean
    5) null (이건 나중에 보자.)
    6) undefined (이것도 나중에 보자.)

2.  선언 방법

         let abc : string = '';
         let cde : number = 0;
         let fgh : boolean = false;

# 변수 연산

1.  string

         let a : string = '가나다';
         let b : string = '라마바';
         let c : string = a+b;
         console.log(c);
         ----------------------------------------------------------------------
         가나다라마바

2.  number

         let a: number = 1 ;
         let b: number = 2 ;
         let c: number = a + b;

         console.log(c);
         ----------------------------------------------------------------------
         3
         ---------------------------------------------------------------------- 3

## 함수 (Function)

1.  원리

    > 입력값을 넣는다.(파라미터)

    > 처리한다. (logic)

    > 결과를 return 한다.

2.  선언방법

         const 함수명 = (파라미터) =>{
            처리로직
            return 결과값;
         };

ex)

         const rain = (param: string) => {
               setFirstString(firstString + param);
               return '완료!!';
         }

## 조건 (if)

1.  사용방법

         if( 조건1 ){
            조건1이 true일때 해야할일
            }
         else if( 조건2){
            조건 2가 true 일때 해야할일
            }
         else{
            조건 1도 2도 아닐때 해야할일
         }

2.  조건절 사용방법

    1.  sting 조건

             if ( a === '가나다' ) // a 가 가나다 일 때
             if ( a !== '가나다' ) // a 가 가나다 아닐때

    2.  number 조건

            if ( a === '가나다' ) // a 가 가나다 일 때
            if ( a !== '가나다' ) // a 가 가나다 아닐때

## Loop

1.  for loop 사용 방법

         for (let inx = 0; inx <= 5; inx++) {
            console.log(inx);
         }

2.  map  
    배열이 선언되어있는 안에서 편리하게 사용할수 있는 자쓰함수

         const arr = ['가', '나', '다', '라'];
         arr.map((miyeon) => {
             console.log(miyeon);
         });

3.  foreach 사용방법은 map과 비슷하다.(나중에 차이점은 알아보자)

         const arr = ['가', '나', '다', '라'];
         arr.foreach((miyeon) => {
             console.log(miyeon);
         });

### 보너스!! 자쓰에서 윤책임님을 위해 하나 보너스를 줬다.

map의 두번째 인자값은 자동빵으로 몇번째 줄인지 index를 준다.

         const arr = ['가', '나', '다', '라'];
         arr.map((miyeon,inx) => {
             console.log(inx);
         });

map의 파라미터 (miyeon) 은 알아서 할당 된다.

         const ManagementRowData3 = [
      {
        System: '법인카드',
        Process: '한도증액',
        'Submission No': 'S2021072100001',
        'Submission Title': '법인카드 한도증액 3만불 이상 CFO승인 필수',
        Registrant: '김바다 bada2 kim',
        RegisterDept: '자금팀 123456',
        'Register Date': '2021-6-22',
        'Standard Authorization Matrix': '-',
        Status: '',
        'Due Date': '',
        'Target Cnt.': '84',
        'Confirm Cnt.': '80',
        'Hold Cnt.': 0,
        'Close Date': '',
      },
      {
        System: '법인카드',
        Process: '한도증액',
        'Submission No': 'S2021072100001',
        'Submission Title': '법인카드 한도증액 3만불 이상 CFO승인 필수',
        Registrant: '김바다 bada2 kim',
        RegisterDept: '자금팀 123456',
        'Register Date': '2021-6-22',
        'Standard Authorization Matrix': '-',
        Status: '',
        'Due Date': '',
        'Target Cnt.': '84',
        'Confirm Cnt.': '80',
        'Hold Cnt.': 0,
        'Close Date': '',
      },
      {
        System: '',
        Process: '한도증액',
        'Submission No': 'S2021072100001',
        'Submission Title': '법인카드 한도증액 3만불 이상 CFO승인 필수',
        Registrant: '김바다 bada2 kim',
        RegisterDept: '자금팀 123456',
        'Register Date': '2021-6-22',
        'Standard Authorization Matrix': '-',
        Status: '',
        'Due Date': '',
        'Target Cnt.': '84',
        'Confirm Cnt.': '80',
        'Hold Cnt.': 0,
        'Close Date': '',
      },
      {
        System: '',
        Process: '한도증액',
        'Submission No': 'S2021072100001',
        'Submission Title': '법인카드 한도증액 3만불 이상 CFO승인 필수',
        Registrant: '김바다 bada2 kim',
        RegisterDept: '자금팀 123456',
        'Register Date': '2021-6-22',
        'Standard Authorization Matrix': '-',
        Status: '',
        'Due Date': '',
        'Target Cnt.': '84',
        'Confirm Cnt.': '80',
        'Hold Cnt.': 0,
        'Close Date': '',
      },
      {
        System: '',
        Process: '한도증액',
        'Submission No': 'S2021072100001',
        'Submission Title': '법인카드 한도증액 3만불 이상 CFO승인 필수',
        Registrant: '김바다 bada2 kim',
        RegisterDept: '자금팀 123456',
        'Register Date': '2021-6-22',
        'Standard Authorization Matrix': '-',
        Status: '',
        'Due Date': '',
        'Target Cnt.': '84',
        'Confirm Cnt.': '80',
        'Hold Cnt.': 0,
        'Close Date': '',
      },
      {
        System: '',
        Process: '한도증액',
        'Submission No': 'S2021072100001',
        'Submission Title': '법인카드 한도증액 3만불 이상 CFO승인 필수',
        Registrant: '김바다 bada2 kim',
        RegisterDept: '자금팀 123456',
        'Register Date': '2021-6-22',
        'Standard Authorization Matrix': '-',
        Status: '',
        'Due Date': '',
        'Target Cnt.': '84',
        'Confirm Cnt.': '80',
        'Hold Cnt.': 0,
        'Close Date': '',
      },
    ];
    const MonitoringRowData2 = [
      {
        No: '1',
        Subsidiary: 'LGEKR',
        'Person in charge': '김시내 sinae3.kim',
        Status: 'Confirmed',
        Comment: 'CFO Role 추가 및 기존 1개 전결을 금액으로 분리하여 1개 전결을 추가완료',
        'Confirm Date': '2021-07-22',
        Hold: 'N',
        'Hold Date': '',
      },
      {
        No: '2',
        Subsidiary: 'LGECH',
        'Person in charge': '장**',
        Status: 'Pending',
        Comment: '',
        'Confirm Date': '',
        Hold: '',
        'Hold Date': '',
      },
      {
        No: '3',
        Subsidiary: 'LGEUS',
        'Person in charge': 'James**',
        Status: 'Rejected',
        Comment: 'US 법인 예외 처리 요청',
        'Confirm Date': '2021-07-22',
        Hold: '',
        'Hold Date': '',
      },
      {
        No: '4',
        Subsidiary: 'LGEKR',
        'Person in charge': '김시내 sinae3.kim',
        Status: 'Confirmed',
        Comment: 'CFO Role 추가 및 기존 1개 전결을 금액으로 분리하여 1개 전결을 추가완료',
        'Confirm Date': '2021-07-22',
        Hold: 'N',
        'Hold Date': '',
      },
    ];
    MonitoringRowData2.map((miyeon, index) => {
      console.log(miyeon.No);
    });
