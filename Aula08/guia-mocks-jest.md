
# 📘 Guia Básico: Tipos de Retorno em Mocks com Jest

## 🔍 O que é um Mock?

Mocks são funções falsas usadas em testes para simular comportamentos de dependências externas. Com Jest, é possível criar essas funções usando `jest.fn()` ou `jest.mock()` e configurar como elas se comportam em diferentes situações, como retornando valores específicos ou simulando promessas.

---

## 🎯 Objetivo

Entender os principais métodos de retorno que podemos configurar em funções mockadas com Jest.

---

## 📚 Métodos de Retorno

### 1. `mockReturnValue(value)`
Retorna sempre o mesmo valor quando a função mock é chamada.

```js
const mockFn = jest.fn();
mockFn.mockReturnValue(10);

mockFn(); // 10
mockFn(); // 10
```

---

### 2. `mockReturnValueOnce(value)`
Retorna o valor **apenas na próxima chamada**. Depois, segue o comportamento padrão.

```js
const mockFn = jest.fn();
mockFn.mockReturnValueOnce(20).mockReturnValue(5);

mockFn(); // 20
mockFn(); // 5
mockFn(); // 5
```

---

### 3. `mockResolvedValue(value)`
Retorna uma `Promise` resolvida com o valor especificado.

```js
const mockFn = jest.fn();
mockFn.mockResolvedValue('ok');

await mockFn(); // 'ok'
```

---

### 4. `mockResolvedValueOnce(value)`
Retorna uma `Promise` resolvida apenas na próxima chamada.

```js
const mockFn = jest.fn();
mockFn.mockResolvedValueOnce('first').mockResolvedValue('later');

await mockFn(); // 'first'
await mockFn(); // 'later'
```

---

### 5. `mockRejectedValue(error)`
Retorna uma `Promise` rejeitada com o erro fornecido.

```js
const mockFn = jest.fn();
mockFn.mockRejectedValue(new Error('fail'));

await mockFn(); // throws Error('fail')
```

---

### 6. `mockRejectedValueOnce(error)`
Mesmo que acima, mas **só na próxima chamada**.

```js
const mockFn = jest.fn();
mockFn.mockRejectedValueOnce(new Error('fail')).mockResolvedValue('ok');

await mockFn(); // throws Error('fail')
await mockFn(); // 'ok'
```

---

### 7. `mockImplementation(fn)`
Define uma **implementação customizada**.

```js
const mockFn = jest.fn();
mockFn.mockImplementation((a, b) => a + b);

mockFn(2, 3); // 5
```

---

### 8. `mockImplementationOnce(fn)`
Define a implementação **apenas para a próxima chamada**.

```js
const mockFn = jest.fn();
mockFn.mockImplementationOnce(() => 'once').mockImplementation(() => 'default');

mockFn(); // 'once'
mockFn(); // 'default'
mockFn(); // 'default'
```

---

## 🧼 Métodos auxiliares

### `mockClear()`
Limpa o histórico de chamadas e instâncias.

```js
mockFn.mockClear();
```

### `mockReset()`
Limpa chamadas e implementações.

```js
mockFn.mockReset();
```

---

## 🧪 Dica de Teste
```js
test('testando mockResolvedValueOnce', async () => {
  const mockFn = jest.fn()
    .mockResolvedValueOnce('primeiro')
    .mockResolvedValue('seguinte');

  expect(await mockFn()).toBe('primeiro');
  expect(await mockFn()).toBe('seguinte');
});
```

---

## ✅ Conclusão

Saber configurar diferentes tipos de retorno com mocks é essencial para simular cenários variados nos testes, especialmente quando se trabalha com APIs, banco de dados ou serviços externos.

Ideal para testes unitários, testes de integração com dependências isoladas, e TDD.

