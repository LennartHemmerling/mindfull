type CSSClassName = { container: string; text: string }

const classNames: [CSSClassName, CSSClassName][] = [
    [
        {
            container: 'color-set_0-0',
            text: 'color-set_0-0-text'
        },
        {
            container: 'color-set_0-1',
            text: 'color-set_0-1-text'
        }
    ],
    [
        {
            container: 'color-set_1-0',
            text: 'color-set_1-0-text'
        },
        {
            container: 'color-set_1-1',
            text: 'color-set_1-1-text'
        }
    ]
]

export default function (index: number, altIndex: 0 | 1): CSSClassName {
    return classNames[index][altIndex]
}