function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = 'http://www.test.com';
  };
}

@reportableClassDecorator
class BugReport {
  type = 'report';
  title: string;
  constructor(t: string) {
    this.title = t;
  }
}

const bug = new BugReport('Bug Report');
console.log(bug);