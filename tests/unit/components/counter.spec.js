import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";
describe("Counter Componet", () => {

    let wrapper;
    beforeEach(() => {//esta funcion se ejecuta antes de cada prueba, generalmente se utiliza para hacer limpiezas
      wrapper= shallowMount(Counter)
    });
  /* test('Debe hacer match con el snapshot', () => {
        //en wraper tenemos el componente montado y podemos tener control sobre el como hacer click y demas
        const wrapper=shallowMount(Counter); 
        //esto si no tengo snapshot me lo crea, y si lo tengo me hace el match
        expect(wrapper.html()).toMatchSnapshot();
        
    });*/
  test('h2 tienen el valor por defecto "Counter"', () => {
  
//find: encuentra el primero, findall encuentra todo
    expect(wrapper.find("h2").exists()).toBeTruthy(); // compruebo que el elemento exista

    const h2Value = wrapper.find("h2").text(); //permite encontrar un elemento, id etc..

    expect(h2Value).toBe("Counter");
  });

  test("El valor por defecto debe ser 100 en el elemento p", () => {
    //wrapper
    

    //const pTags= wrapper.findAll('p')

    const pTag = wrapper.find("[data-testId]").text();

    expect(pTag).toBe("100");
  });

  test("Debe incrementar y decrementar en 1 el contador", async () => {
    //tenemos los dos botones para poder hacer click
    const [increaseBtn, decreaseBtn] = wrapper.findAll("button");
    //hacemos click, trigger es un metodo asincrono
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");

    // cogemos el p para verificar si aumento el counter
    const pTag = wrapper.find("[data-testId]").text();

    expect(pTag).toBe("101");
  });
  
  //leer props desde pruebas
  test('Debe establecer el valor por defecto', () => {
      
    const {start}= wrapper.props();// accedemos a las props del componente

    const value= wrapper.find('[data-testId]').text();

    expect(Number(value)).toBe(start)
  });

  //leer props y evaluarlas
  test('debe mostrar las props title', () => {
      
    const title= 'Hola mundo'
    const wrapper = shallowMount(Counter,
        {
            props:{
                title
            }
        })
  const h2Tag= wrapper.find('h2').text()
    expect(h2Tag).toBe(title)
  });
  
});
