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
