# 시작 1일차 
1. node 설치 : http://nodejs.org/ko/download/

2. npx 설치 명령어 : npm install npx -g 

3. cra 수행 with TS : npx create-react-app myfront --template=typescript

4. vsCode 설치 : https://code.visualstudio.com/download

5. vsc Extenstion 설치 
    1. prettier : https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode  
    설정파일 생성  
    파일명: .prettierrc  
        파일내용: 
        
            {  
                "trailingComma": "es5",  
                "tabWidth": 4,  
                "semi": false,  
                "singleQuote": true  
            }
    
6. 수행한다.  


        npm start


# 시작 3일차 
* 세상으로 나가 보자!

1. netlify 배포용 branch를 따로 만들자.  
    1. VS code에서 ctrl+p 를 누른다.
    2. branch 를 타입핑한다.
    3. Create new Branch 를 선택한다.
    4. branch 명을 넣는다.  
     ex) netlify
    5. git을 commit 하여 push 한다

1. netlify 가입 with GitHub: https://www.netlify.com/


    
3. Branch를 선택할대 netlify 용 branch를 선택한다.


4. Deploy 설정 할때 Build script 를 변경해주어야 한다.  
  Build command : CI= npm run build  
![캡처](/public/md/netlify_setup.png)

5. VsCode에서 netlify branch로 push를 해보자!  

6. Deploy (배포) 잘되었는지 보자  
    1. Deploy 메뉴를 클릭
    2. 배포 상태가 Published 가 되었는지 확인
    ![캡처](/public/md/netlify_setup6.png)

5. 도메인을 살짝 바꾸어보자 (Setting 들어가는 방법)
  본인 아이디 클릭
![캡처](/public/md/netlify_setup2.png)

6. site settings 클릭
![캡처](/public/md/netlify_setup3.png)

7. site name 클릭
![캡처](/public/md/netlify_setup4.png)

8. 원하는 이름으로 바꾸고 Save 클릭
![캡처](/public/md/netlify_setup5.png)

9. 크롬에 Url 로 테스트 해본다.  
ex) https://redsky21.netlify.app/
