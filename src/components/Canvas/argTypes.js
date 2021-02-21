import defaultText from './md'

export const argTypes = {
    text: {
        control: {
            type: 'text'
        }
    },
    autoSize: {
        control: {
            type: 'boolean'
        }
    },
    before: { table: { disable: true } },
    after: { table: { disable: true } },
    draw: { table: { disable: true } },
    blockRadius: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    codespanStrokeStyle: {
        control: {
            type: 'color'
        }
    },
    codespanFillStyle: {
        control: {
            type: 'color'
        }
    },
    linkFillStyle: {
        control: {
            type: 'color'
        }
    },
    hrStrokeStyle: {
        control: {
            type: 'color'
        }
    },
    blockquoteWidth: {
        control: {
            type: 'range',
            min: 0,
            max: 1000,
            step: 1
        }
    },
    blockquoteFillStyle: {
        control: {
            type: 'color'
        }
    },
    blockquoteStrokeStyle: {
        control: {
            type: 'color'
        }
    },
    codeFillStyle: {
        control: {
            type: 'color'
        }
    },
    codeStrokeStyle: {
        control: {
            type: 'color'
        }
    },
    listRadius: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    listFillStyle: {
        control: {
            type: 'color'
        }
    },
    listMarginLeft: {
        control: {
            type: 'range',
            min: 0,
            max: 1000,
            step: 1
        }
    },
    listMarginBottom: {
        control: {
            type: 'range',
            min: 0,
            max: 1000,
            step: 1
        }
    },
    fontPadding: {
        control: {
            type: 'range',
            min: 0,
            max: 1000,
            step: 1
        }
    },
    fontSize: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    fontLineHeight: {
        control: {
            type: 'range',
            min: 0,
            max: 10,
            step: 0.1
        }
    },
    fontHeadingSize1: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    fontHeadingSize2: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    fontHeadingSize3: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    fontHeadingSize4: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    fontHeadingSize5: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    },
    fontHeadingSize6: {
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1
        }
    }
}

export const args = {
    text: defaultText,
    autoSize: true,
    blockRadius: 4,
    codespanStrokeStyle: '#ddd',
    codespanFillStyle: '#f8f8f8',
    linkFillStyle: '#409eff',
    hrStrokeStyle: '#eaecef',
    blockquoteWidth: 5,
    blockquoteFillStyle: '#f8f8f8',
    blockquoteStrokeStyle: '#f8f8f8',
    codeFillStyle: '#ddd',
    codeStrokeStyle: '#f8f8f8',
    listRadius: 3,
    listFillStyle: '#000',
    listMarginLeft: 24,
    listMarginBottom: 12,
    fontFamily: 'Open sans',
    fontPadding: 8,
    fontSize: 16,
    fontLineHeight: 1.2,
    fontHeadingSize1: 32,
    fontHeadingSize2: 24,
    fontHeadingSize3: 20,
    fontHeadingSize4: 16,
    fontHeadingSize5: 14,
    fontHeadingSize6: 13
}
