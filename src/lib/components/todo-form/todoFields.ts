import { todoPriorityEnums } from "$lib/enums/todoEnums"

type TTodoFields = {
    name: string
    type: 'text' | 'radio' | 'textarea'
    label?: string
    placeholder?: string;
    value?: any
    defaultChecked?: boolean
}

export const todoFields: TTodoFields[] = [
    {
        name: 'todoBody',
        type: 'textarea',
        placeholder: 'Write todo...',
        label: 'Todo'
    },
    {
        name: 'expireDate',
        type: 'text',
        placeholder: 'choose date'
    }
]

export const todoRadioFields: TTodoFields[] = [
    {
        name: 'priority',
        type: 'radio',
        value: todoPriorityEnums.high,
        label: 'High',
        defaultChecked: true
    },
    {
        name: 'priority',
        type: 'radio',
        label: 'Medium',
        value: todoPriorityEnums.medium
    },
    {
        name: 'priority',
        type: 'radio',
        label: 'Low',
        value: todoPriorityEnums.low
    },
]