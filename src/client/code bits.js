// fetch with async/await
async function getTaskListFromWeb() {
  let response = await fetch(API_KEY_LATEST);
  if (!response.ok) {
    throw new Error("HTTP-Error: " + response.status);
  }
  jsonBin = await response.json();
  taskList = jsonBin.record["my-todo"];
}
const { funtcion1: function1, function2, function3 } = require("..\file");

beforeAll(()=>console.log('starting'))
afterAll(()=>console.log('all finished'))
beforeEach(()=>console.log('test case started'))
afterEach(()=>console.log('test case ended'))


describe("group to test", () => {
  test("describe", () => {
    const result = functionTested();
    expect(result).toBe(something);
  });
  // test that a function throws out an error
  it('should trow a typeError',()=>{
    expect(()=>functionA()).toThrow(TypeError)
    expect(functionA()).toThrow("error message")

  })
}); 
return fetchData().then(data => {
  expect(data).toBe('peanut butter');
  test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
  });
  test('the fetch fails with an error', () => {
    return expect(fetchData()).rejects.toMatch('error');
  });

  test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
  });
  
  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await fetchData();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

