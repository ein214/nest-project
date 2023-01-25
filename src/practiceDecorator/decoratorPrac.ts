function deco(value: string) {
  console.log('데커레이터가 평가됨')
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('데커레이터가 실행됨 ' + value)
  }
}

class TestClass {
  @deco('HELLO')
  test() {
    console.log('함수 호출됨')
  }
}

const t1 = new TestClass();
t1.test();