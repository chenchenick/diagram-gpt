import { parseCodeFromMessage } from '../lib/utils';

describe('parseCodeFromMessage', () => {
  it('should return the code inside triple backticks', () => {
    const message = 'Some text before\n```mermaid\ngraph LR\nA --> B\n```Some text after';
    const expectedCode = 'graph LR\nA --> B';

    const result = parseCodeFromMessage(message);

    expect(result).toEqual(expectedCode);
  });

  it('should return the original message if no code is found', () => {
    const message = 'This is a regular message without code';

    const result = parseCodeFromMessage(message);

    expect(result).toEqual(message);
  });

  it('should handle multiple code blocks', () => {
    const message = '```mermaid\nsequenceDiagram\nparticipant client as Client\nparticipant server as Server\nclient ->> server: HTTP Request\nserver -->> client: HTTP Response\n```';
    const expectedCode = 'sequenceDiagram\nparticipant client as Client\nparticipant server as Server\nclient ->> server: HTTP Request\nserver -->> client: HTTP Response\n';

    const result = parseCodeFromMessage(message);

    expect(result).toEqual(expectedCode);
  });
});