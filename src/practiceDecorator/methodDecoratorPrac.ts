function HandleError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)

    const method = descriptor.value;
    descriptor.value = function () {
      try {
        method();
      } catch (e) {
        console.log(e);
      }
    }
  }
}

class Greeter {
  @HandleError()
  hello() {
    throw new Error('에러 테스트');
  }
}

const t = new Greeter();
t.hello();