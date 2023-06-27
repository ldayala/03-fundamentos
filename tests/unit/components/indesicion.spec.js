import { shallowMount } from "@vue/test-utils";
import Indesicion from "@/components/Indesicion";

describe("Indesicion Component", () => {
  let wrapper;
  let clgSpy;
  //hacemos un mock del fetch api para que lo pueda reconocer node ya que en este no existe
  global.fetch =
    jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif",
          }),
      })
    ) 

    beforeEach(() => {
      wrapper = shallowMount(Indesicion);
      //creo un espia para que me este espiando dentro del obj console el metodo log
      clgSpy = jest.spyOn(console, "log");
      jest.clearAllMocks(); // limpiamos todos los mocks
    });

  test("hacer match con el snatshop", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("escribir en el inpunt no debe disparar nada console.log()", async () => {
    //spy con la instancia de vue  wrapper.vm para poder espiar el getAnswer
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("hola mundo");

    expect(clgSpy).toHaveBeenCalledTimes(1);
    //comprobamos que no se dispare el metodo
    //expect(getAnswerSpy).toHaveBeenCalledTimes(0)
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('escribir "?" debe disparar el fetch', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("hola?");
    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("pruebas en el getAnswer", async() => {
    // ejecutamos el metodo getAnswer del componente
    await wrapper.vm.getAnswer()

    const img= wrapper.find('img');//cargamos el elemento img

    expect(img.exists()).toBeTruthy()//verificamos que exista el img
    // accedemos a la propiedad reactiva img y verficamos que tenga el valor pasado
    expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')

    expect(wrapper.vm.answer).toBe('Si!!!')

  });

  test("pruebas en getAnswer - Fallo de Api", async() => {

//TODO: simulacion fallo API
   fetch.mockImplementationOnce(()=>Promise.reject('Fallo Api'))

   await wrapper.vm.getAnswer()

    const img= wrapper.find('img')

    //verificamos que la imagen no exista
     expect(img.exists()).toBeFalsy()

     expect(wrapper.vm.answer).toBe('Error en la llamada a la Api')
  });
});
