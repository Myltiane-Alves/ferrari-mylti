const { it } = require("date-fns/locale");
const { appendTemplate, getQueryString } = require("./utils");

it("Should create and add an element", () => {

    const mainElement = document.createElement('main');

    expect(appendTemplate(mainElement, 'h1', 'Hcode lab ferrari').outerHTML).toBe('<h1>Hcode lab ferrari</h1>');
    

});

it("Should return the data from a url string", () => {
    const result = getQueryString("https://hcode.com.br/?page=login&form=register");

    expect(JSON.stringify(result).replace('\\', '')).toEqual('{"page":"login", "form":"register"}');
});