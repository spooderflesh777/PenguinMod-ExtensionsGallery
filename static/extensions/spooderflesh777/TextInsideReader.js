class TextInsideReader {
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'spooderTextInsideReader',
      name: 'Text Inside Reader',
      blocks: [
        {
          opcode: 'readTextInside',
          blockType: Scratch.BlockType.REPORTER,
          text: 'read text inside of [element] in set [setNumber] of [text]',
          arguments: {
            element: {
              type: Scratch.ArgumentType.STRING,
              menu: 'elements',
              defaultValue: 'parenthesis',
            },
            setNumber: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1,
            },
            text: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '(hello) (world)',
            },
          },
        },
        {
          opcode: 'readTextInsideNested',
          blockType: Scratch.BlockType.REPORTER,
          text: 'read text inside of nested [element] in [text]',
          arguments: {
            element: {
              type: Scratch.ArgumentType.STRING,
              menu: 'elements',
              defaultValue: 'parenthesis',
            },
            text: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '((hello world))',
            },
          },
        },
      ],
      menus: {
        elements: {
          acceptReporters: true,
          items: ['parenthesis', 'slashes', 'brackets', 'braces', 'angle brackets', 'backslashes', 'quotes'],
        },
      },
      color1: '#d10f0f', 
    };
  }

  readTextInside(args) {
    const element = args.element;
    const setNumber = args.setNumber;
    const text = args.text;

    const regex = this.getRegex(element);
    if (!regex) return ''; // Handle invalid element type

    const sets = text.matchAll(regex);
    const values = [...sets].map(match => match[1]);

    if (setNumber >= 1 && setNumber <= values.length) {
      return values[setNumber - 1];
    } else {
      return '';
    }
  }

  readTextInsideNested(args) {
    const element = args.element;
    const text = args.text;

    const regex = this.getRegex(element);
    if (!regex) return ''; // Handle invalid element type

    let deepestValue = null;
    let match;

    while ((match = regex.exec(text)) !== null) {
      deepestValue = match[1];
    }

    return deepestValue || '';
  }

  getRegex(element) {
    switch (element) {
      case 'parenthesis':
        return /\(([^()]*)\)/g;
      case 'slashes':
        return /\/([^\/]*)\//g;
      case 'brackets':
        return /\[([^\[\]]*)\]/g;
      case 'braces':
        return /\{([^\{\}]*)\}/g;
      case 'angle brackets':
        return /<([^<>]*)>/g;
      case 'backslashes':
        return /\\([^\\]*)\\/g;
      case 'quotes':
        return /"([^"]*)"/g;
      default:
        return null; // Returning null to indicate an invalid element
    }
  }
}

Scratch.extensions.register(new TextInsideReader());
