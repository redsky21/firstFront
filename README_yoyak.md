# React 구조.

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

# React State

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

# 함수 (Function)

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

# 조건 (if)

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

            if ( a === '가나다' ) // a 가 가나다 일 때!
            if ( a !== '가나다' ) // a 가 가나다 아닐때
