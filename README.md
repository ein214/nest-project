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


## 프로바이더
- 비즈니스 로직을 수행하는 역할
- 서비스, 저장소, 팩토리, 헬퍼 등의 형태로 구현 가능

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
