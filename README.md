# 2023-01-25

## Decorator
- 횡단 관심사 Cross-cutting concern 분리
- 데커레이터 기본 선언 방식
```typescript
function deco(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	console.log('데커레이터가 평가됨')
}

class TestClass {
	@deco
	test() {
		console.log('함수 호출됨')
	}
}

const t = new TestClass();
t.test();
```
- 데커레이터
- 각 데커레이터 사용 시 표현은 위에서 아래로 `평가` 되고 아래서 위로  함수로 `호출`
- 데커레이터는  클래스, 메서드, 접근자, 프로퍼티, 매개변수 에 적용 가능

### 클래스 데커레이터
- 클래스 바로 앞에 선언
- d.ts 선언파일과 선언 클래스 내에서는 사용할 수 없음.
- 클래스 데커레이터는 생성자를 리턴하는 함수여야함

### 메서드 데커레이터
- 메서드 바로 앞에 선언
- 메서드 정의를 읽거나 수정 가능
- 메서드가 속한 클래스의 생성자 함수 or 클래스 프로토타입, 멤버의 이름, 멤버의 속성 설명자 PropertyDescriptor 3개의 인수가 필요함

### 접근자 데커레이터
- 접근자 바로 앞에 선언 ( getter / setter )
- 접근자의 정의를 읽거나 수정

### 속성 데커레이터
- 클래스 속성 바로 앞에 선언
- 속성의 정의를 읽음
- 프로토타입, 멤버의 이름 2가지 인수를 가짐
- 속성 설명자가 존재하지 않고 공식 문서에 따르면 반환값도 무시 => 프로트타입 멤버를 정의할 때 인스턴스 속성을 설명하는 메커니즘이 없고 초기화 과정을 관찰하거나 수정할 방법이 없기 때문

### 매개변수 데커레이터
- 생성자 또는 메서드 매개변수에 선언되어 적용
- 메서드의 정의를 읽음
- 프로토타입, 멤버의 이름, 매개변수가 함수에서 몇 번째 위치에 선언되었는지 나타내는 인덱스 3개 인수와 함께 호출, 반환값은 무시
- 단독으로 사용하는 것 보다는 함수 데커레이터와 함께 사용할 때 유용

## 컨트롤러
- mvc에서 말하는 그 컨트롤러
- request를 받고 처리된 걸 response로 돌려주는 그 열할
- nest는 라우팅 자체가 컨트롤러에서 데커레이터를 통해 설정되는 것 같다
- `@Get()`, `@Post()` 형태로 라우팅 설정
- `@Query()`, `@Param(key?: string)`, `@Body()` 데커레이터로 request에 포함된 정보를 받음
- `@Res()` 를 통해 response 응답객체를 다룰 수 있음
- `@HttpCode(200 or 202 or 400)`  등으로 응답코드 처리할 수 있음
- `@Header` 나 `res.header` 등으로 커스텀 헤더 직접 설정 가능
- `@Redirect('리다이렉트 시킬 주소', 301[리다이렉트 응답코드])`
- `nest g co XXX` xxx 컨트롤러 생성
- `nest g resource xxx` xxx에 대한  CRUD 전체 생성

## 프로바이더
- 비즈니스 로직을 수행하는 역할
- 서비스, 저장소, 팩토리, 헬퍼 등의 형태로 구현 가능
- Module에서 사용할 수 있도록 등록을 해줘야함. nest cli로 자동생성했다면 바로 등록되어있음.

## 모듈
- `@Module` 데커레이터를 사용하고 인수로 ModuleMetadata를 받음
- ModuleMetadata
    - `import` : 현재 모듈에서 사용하기 위한 프로바이더를 가지고 있는 다른 모듈을 가지고옴. ex) 유저가 결제하여 라이센스가 생성되는 경우 - UsersModule, OrdersModule, LicensesModule
    - `controllers / providers` : 현재 모듈 전반에서 컨트롤러와 프로바이더를 사용할 수 있도록 nest가 객체를 생성하고 주입할 수 있게 해줌
    - `export` : 현재 모듈에서 제공하는 컴포넌트를 다른 모듈에서 import해서 쓰고자한다면 export를 해야 다른 모듈에서 사용가능
- 가져온 모듈 다시 내보내기 가능
- `nest g mo XXX` - XXX 모듈 생성

- [관점 지향 프로그래밍 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EA%B4%80%EC%A0%90_%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)

# 2023-01-26
## 파이프
- Request가 라우터 핸들러로 전달되기 전에  Request 객체를 변환할 수 있음.
- 미들웨어의 역할과 비슷하지만 미들웨어는 애플리케이션 전역에서 사용하도록 할 수 없음. -> 현재 요청이 어떤 핸들러에서 수행되는지, 어떤 매개변수를 가지는지 실행 컨텍스트를 알지 못하기 때문
- 라우트 핸들러 : Request를 처리하는 엔드포인트마다 동작을 수행하는 컴포넌트
  ex) react쪽 front에서 커맨드를 통해 url경로로 서버에 요청을 하면 그 url 경로와 컨트롤러를 매핑하는걸 라우트 핸들러가 함
- 파이프 목적 2가지
  - 변환 Transformation: 입력 데이터의 형식 변환. ex) pathParam으로 들어온 :id값의 형변환
  - 유효성 검사 Validation: 유효성 체크하여 예외 처리
- 내장되어 있는 파이프
  - ValidationPipe : 유효성 체크
    - Joi, [class-validator & class-transformer](https://github.com/typestack/class-validator)
  - ParseIntPipe, ParseBoolPipe, ParseArrayPipe, ParseUUIDPipe : 형변환
  - DefaultValuePipe : 기본값 설정할 때 사용
- PipeTransform 인터페이스를 상속받고 @Injectable 데커레이터를 붙여주면 커스텀 파이프 정의 가능

## 데이터베이스/TypeORM/transaction
- [nest가 DB에서 사용하는 저장소 패턴](https://learn.microsoft.com/ko-kr/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
  - DB나 factory같은 저장소를 다루는 로직을 데이터 레이어로 분리하는 것
  - 인터페이스를 통해 데이터를 처리하도록 추상화 되있기 때문에 저장소 변경하기가 쉽다.
  - 현재 프로젝트 기준 knexXXX, mockXXXX 분리되어있는 것들이 저장소의 구체적인 구현들에 해당
  - DB를 mysql -> postgresql 등으로 바꾸는 경우도 클라이언트와 인터페이스는 놔두고 postgres용 구현체를 적절하게 작업해주면 됨.
- 서비스 프로바이더에서 DB repository를 주입할 때는 @InjectRepository를 사용하여 의존성 주입
- TypeORM에서 트랜잭션을 사용하는 방법
  - 서비스 로직에 typeorm의 DataSource 객체를 주입
    - QueryRunner를 이용해서 단일 DB 커넥션 상태를 생성하고 관리
    - transaction 함수를 직접 사용하기
      - 이 경우 EntityManager를 콜백으로 받아서 콜백함수 안에 소스를 작성
- TypeORM에서 마이그레이션 명령어
```bash
// 마이그레이션 파일 생성
$ migration:create  [파일명]

// 마이그레이션 함수 실행
$ migration:run

// 마이그레이션 한 것 롤백
$ migration:revert
```

## 미들웨어
- 라우트 핸들러가 클라이언트의 요청을 처리하기전에 수행하는 컴포넌트
- 요청과 응답에 변형을 가할 수 있고 주기를 끝낼 수 있음. 다만 끝내는것이 아니라 계속 진행하려면 next()를 호출해야한다. 안 하면 애플리케이션이 아무것도 못 하는 hanging 상태에 빠짐
- 미들웨어가 할 수 있는 작업들
  - 쿠키 파싱
  - 세션 관리
  - 인증/인가
  - 본문 파싱
- 비슷한 개념으로 인터셉터가 있다는데 장난하니 파이프도 미들웨어랑 비슷하대지 인터셉터도 비슷하대지
- 미들웨어는 class로 만들어서 app module에 선언된 configure 함수를 통해 설정할 수도 있고 함수형으로 만들어서 main.ts에서 사용할 수도 있다. 단 함수형 미들웨어를 사용하여 전역으로 적용하는 경우 프로바이더를 주입받아 사용할 수가 없다
- 보통 유저 서비스에서는 미들웨어보다는 Guard 를 적용해서 객체를 처리함

## JWT 인증/인가
- 인증 : 미들웨어로 구현하는 것이 좋음. 요청자가 자신이 누구인지 증명하는 과정. 서버에 요청시마다 헤더에 JWT 토큰을 보내고 이 토큰을 통해 라우터에 접근 가능한지 확인하는 방식
- 인가 : 인증을 통과한 유저가 해당 기능을 사용할 권한이나 자격이 있는지를 체크하는 것. Permission, Role, ACL(Access control list) 등등의 개념들이 인가에 해당하고 보통 Guard로 구현하기 좋은 사례
- 인증에 실패했을 경우에는 401 Unauthorized 에러코드, 인가에 실패했을 경우에는 403 Forbidden 에러코드를 사용
- 인증은 이 유저가 토큰을 통해 인증여부만 판별하고 다음 미들웨어나 응답으로 제어권을 넘기면 되서 미들웨어로 구현해도 되지만 인가는 이 유저가 실패하거나 성공했을경우 다음 실행될 작업을 정확히 알아야 하기 때문에 다음 실행 context에 접근할 수 있는 Guard로 구현하는게 적합
- Guard는 CanActivate 인터페이스를 구현해야 함.
  - Guard를 적용하는 방법은 부트스트랩 단계에서 `app.useGlobalGuards` 로 선언해주는 방법이 있고, 각 컨트롤러에서 `@UseGuards` 데커레이터로 선언해서 사용할 수도 있다.
  - 만양 Guard에 종속성 주입을 사용해서 다른 프로바이더를 사용하고 싶다면 app.modules.ts에서 커스텀 프로바이더로 선언해줘야함.
- 인증에 관련된 저장소
  - 세션 저장소 - 창 닫고 다시 열면 초기화
  - 로컬 저장소 - 창을 닫아도 데이터가 남아있음
  - 쿠키 - 간단한 데이터 저장
- JWT는 너도 나도 모두가 아니까 패스


## 심화 - Nest 에서 제공하는 커스텀 데커레이터
| 내장 데커레이터          | Express 객체                     |
| ------------------------ | -------------------------------- |
| @Request, @Req()         | req                              |
| @Response(), @Res()      | res                              |
| @Next()                  | next()                           |
| @Session()               | req.session                      |
| @Param(param?: string)   | req.params / req.params[param]   |
| @Body(param? : string)   | req.body / req.body[param]       |
| @Query(param?: string)   | req.query / req.query            |
| @Headers(param?: string) | req.headers / req.headers[param] |
| @Ip()                    | req.ip                           |
| @HostParam()             | req.hosts                                 |

## Logging


## Exception


---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
