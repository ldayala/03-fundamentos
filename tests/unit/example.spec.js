//nombre que le vamos a dar a todo el test swit
//dentro del la func callback va a estar todas las preubas que le realizamos al componete
describe("Example Component", () => {
  //puede ser test suites
  test("Debe ser mayor a 10", () => {
    //Arreglar
    let value = 9;

    //Estimulo
    value = value + 2;

    //Observar resultado
    expect(value).toBeGreaterThan(10);
  });
});
