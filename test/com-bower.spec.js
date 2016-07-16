/**
 * Created by unnKoel on 2016/7/16.
 */
describe('a suit about testing the speciality of IE bower', function () {
  var bower;
  beforeAll(function () {
    bower = cmm();
  });

  it('isIE func test', function () {
    expect(bower.isIE()).toBe(true);
  });

  it('getIEVersion func test', function () {
    expect(bower.getIEVersion()).toBe(8);
  });

  it('getBrowserType func test', function () {
    expect(bower.getBrowserType()).toBe('ie8');
  });
});